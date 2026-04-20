import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetch } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import type {
  Plate,
  PlateDetail,
  PaginatedResponse,
  MapSummaryResponse,
  StateDetail,
  LeaderboardResponse,
  VoteResponse,
  FavoriteResponse,
  UserProfile,
  UserVote,
  UploadSignResponse,
  Comment,
} from '@/lib/types'

// Feed
export function useFeed(filters: { state?: string; sort?: string; q?: string }) {
  return useInfiniteQuery({
    queryKey: queryKeys.plates.feed(filters),
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams()
      if (filters.state) params.set('state', filters.state)
      if (filters.sort) params.set('sort', filters.sort)
      if (filters.q) params.set('q', filters.q)
      if (pageParam) params.set('cursor', pageParam)
      params.set('limit', '24')
      return apiFetch<PaginatedResponse<Plate>>(`/plates?${params}`)
    },
    initialPageParam: '' as string,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
  })
}

// Recent plates (home page)
export function useRecentPlates(limit = 8) {
  return useQuery({
    queryKey: [...queryKeys.plates.all, 'recent', limit],
    queryFn: () => apiFetch<PaginatedResponse<Plate>>(`/plates?sort=recent&limit=${limit}&status=approved`),
  })
}

// Plate detail
export function usePlateDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.plates.detail(id),
    queryFn: () => apiFetch<PlateDetail>(`/plates/${id}`),
    enabled: !!id,
  })
}

// Map
export function useMapSummary() {
  return useQuery({
    queryKey: queryKeys.map.summary,
    queryFn: () => apiFetch<MapSummaryResponse>('/map/summary'),
    staleTime: 5 * 60_000,
  })
}

// State detail
export function useStateDetail(code: string) {
  return useQuery({
    queryKey: queryKeys.states.detail(code),
    queryFn: () => apiFetch<StateDetail>(`/states/${code}`),
    enabled: !!code,
  })
}

// Leaderboard
export function useLeaderboard(window: string, limit = 50) {
  return useQuery({
    queryKey: queryKeys.leaderboard.overall(window),
    queryFn: () => apiFetch<LeaderboardResponse>(`/leaderboard/overall?window=${window}&limit=${limit}`),
  })
}

export function useStateLeaderboard(stateCode: string, window: string, limit = 10) {
  return useQuery({
    queryKey: queryKeys.leaderboard.state(stateCode, window),
    queryFn: () => apiFetch<LeaderboardResponse>(`/leaderboard/state/${stateCode}?window=${window}&limit=${limit}`),
    enabled: !!stateCode,
  })
}

// Vote
function applyPlateVotePatch(p: Plate, plateId: string, newValue: 1 | -1 | 0): Plate {
  if (p.id !== plateId) return p
  const prev = p.user_vote
  const delta = newValue - prev
  return {
    ...p,
    user_vote: newValue,
    score: p.score + delta,
    upvotes: p.upvotes + (newValue === 1 ? 1 : 0) - (prev === 1 ? 1 : 0),
    downvotes: p.downvotes + (newValue === -1 ? 1 : 0) - (prev === -1 ? 1 : 0),
  }
}

function isPlateLike(v: unknown): v is Plate {
  return !!v && typeof v === 'object' && 'id' in v && 'score' in v && 'plate_text' in v
}

function patchPlatesInCache(data: unknown, plateId: string, newValue: 1 | -1 | 0): unknown {
  if (!data || typeof data !== 'object') return data
  const d = data as Record<string, unknown>
  const patch = (p: Plate) => applyPlateVotePatch(p, plateId, newValue)

  if (Array.isArray(d.pages)) {
    return {
      ...d,
      pages: (d.pages as unknown[]).map((pg) => {
        const page = pg as { items?: unknown[] } | null
        if (!page || !Array.isArray(page.items)) return pg
        return {
          ...page,
          items: page.items.map((it) => (isPlateLike(it) ? patch(it) : it)),
        }
      }),
    }
  }

  if (Array.isArray(d.items)) {
    return { ...d, items: d.items.map((it) => (isPlateLike(it) ? patch(it) : it)) }
  }

  if ('top_10' in d || 'hero_plate' in d) {
    return {
      ...d,
      hero_plate: isPlateLike(d.hero_plate) ? patch(d.hero_plate) : d.hero_plate,
      top_10: Array.isArray(d.top_10)
        ? (d.top_10 as unknown[]).map((p) => (isPlateLike(p) ? patch(p) : p))
        : d.top_10,
    }
  }

  return data
}

function patchMyVotesInCache(
  data: unknown,
  plateId: string,
  newValue: 1 | -1 | 0,
  freshPlate: Plate | null,
): unknown {
  if (!data || typeof data !== 'object') return data
  const d = data as { pages?: unknown[] }
  if (!Array.isArray(d.pages)) return data
  const now = new Date().toISOString()

  return {
    ...d,
    pages: d.pages.map((pg, pgIdx) => {
      const page = pg as { items?: unknown[] } | null
      if (!page || !Array.isArray(page.items)) return pg
      const items = page.items as UserVote[]
      if (items.length > 0 && !items[0]?.plate) return pg

      const existingIdx = items.findIndex((v) => v.plate?.id === plateId)
      let nextItems = items

      if (newValue === 0) {
        if (existingIdx >= 0) nextItems = items.filter((_, i) => i !== existingIdx)
      } else if (existingIdx >= 0) {
        nextItems = items.map((v, i) =>
          i === existingIdx
            ? { ...v, value: newValue, voted_at: now, plate: applyPlateVotePatch(v.plate, plateId, newValue) }
            : v,
        )
      } else if (pgIdx === 0 && freshPlate) {
        nextItems = [
          { plate: applyPlateVotePatch(freshPlate, plateId, newValue), value: newValue, voted_at: now } as UserVote,
          ...items,
        ]
      }

      return { ...page, items: nextItems }
    }),
  }
}

export function useVote(plateId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (value: 1 | -1 | 0) =>
      apiFetch<VoteResponse>(`/plates/${plateId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ value }),
      }),
    onMutate: async (newValue) => {
      const touchedKeys = [
        ['leaderboard'] as const,
        ['states'] as const,
        queryKeys.me.plates,
        queryKeys.me.votes,
      ]
      for (const key of touchedKeys) {
        await queryClient.cancelQueries({ queryKey: key })
      }

      const snapshot = touchedKeys.flatMap((key) => queryClient.getQueriesData({ queryKey: key }))

      queryClient.setQueriesData({ queryKey: ['leaderboard'] }, (old) =>
        patchPlatesInCache(old, plateId, newValue),
      )
      queryClient.setQueriesData({ queryKey: ['states'] }, (old) =>
        patchPlatesInCache(old, plateId, newValue),
      )
      queryClient.setQueriesData({ queryKey: queryKeys.me.plates }, (old) =>
        patchPlatesInCache(old, plateId, newValue),
      )

      let freshPlate: Plate | null = null
      const detail = queryClient.getQueryData<Plate>(queryKeys.plates.detail(plateId))
      if (isPlateLike(detail)) freshPlate = detail
      if (!freshPlate) {
        const feeds = queryClient.getQueriesData<unknown>({ queryKey: queryKeys.plates.all })
        for (const [, val] of feeds) {
          const pages = (val as { pages?: { items?: Plate[] }[] } | undefined)?.pages
          const found = pages?.flatMap((p) => p.items ?? []).find((p) => p?.id === plateId)
          if (found) {
            freshPlate = found
            break
          }
        }
      }

      queryClient.setQueriesData({ queryKey: queryKeys.me.votes }, (old) =>
        patchMyVotesInCache(old, plateId, newValue, freshPlate),
      )

      return { snapshot }
    },
    onError: (_err, _value, context) => {
      if (!context?.snapshot) return
      for (const [key, data] of context.snapshot) {
        queryClient.setQueryData(key, data)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plates.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.plates.detail(plateId) })
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
      queryClient.invalidateQueries({ queryKey: ['states'] })
      queryClient.invalidateQueries({ queryKey: queryKeys.me.plates })
      queryClient.invalidateQueries({ queryKey: queryKeys.me.votes })
    },
  })
}

// Profile
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.me.profile,
    queryFn: () => apiFetch<UserProfile>('/me'),
  })
}

export function useMyPlates() {
  return useInfiniteQuery({
    queryKey: queryKeys.me.plates,
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams()
      if (pageParam) params.set('cursor', pageParam)
      return apiFetch<PaginatedResponse<Plate>>(`/me/plates?${params}`)
    },
    initialPageParam: '' as string,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
  })
}

export function useMyFavorites() {
  return useInfiniteQuery({
    queryKey: queryKeys.me.favorites,
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams()
      if (pageParam) params.set('cursor', pageParam)
      return apiFetch<PaginatedResponse<Plate>>(`/me/favorites?${params}`)
    },
    initialPageParam: '' as string,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
  })
}

export function useToggleFavorite(plateId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () =>
      apiFetch<FavoriteResponse>(`/plates/${plateId}/favorite`, { method: 'POST' }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me.favorites })
      // Patch is_favorited in-place so we don't trigger a full refetch mid-vote
      queryClient.setQueryData(queryKeys.plates.detail(plateId), (old: unknown) => {
        if (!old || typeof old !== 'object') return old
        return { ...(old as object), is_favorited: data.is_favorited }
      })
    },
  })
}

export function useMyVotes() {
  return useInfiniteQuery({
    queryKey: queryKeys.me.votes,
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams()
      if (pageParam) params.set('cursor', pageParam)
      return apiFetch<PaginatedResponse<UserVote>>(`/me/votes?${params}`)
    },
    initialPageParam: '' as string,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
  })
}

// Upload
export function useUploadSign() {
  return useMutation({
    mutationFn: (data: { content_type: string; file_size_bytes: number; client_hash: string }) =>
      apiFetch<UploadSignResponse>('/uploads/sign', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  })
}

export function useCreatePlate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { upload_token: string; object_path: string; plate_text: string; state_code: string; caption?: string }) =>
      apiFetch<Plate>('/plates', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plates.all })
    },
  })
}

// Comments
export function useComments(plateId: string) {
  return useInfiniteQuery({
    queryKey: ['comments', plateId],
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams()
      if (pageParam) params.set('cursor', pageParam)
      return apiFetch<PaginatedResponse<Comment>>(`/plates/${plateId}/comments?${params}`)
    },
    initialPageParam: '' as string,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
    enabled: !!plateId,
  })
}

export function useCreateComment(plateId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: string) =>
      apiFetch<Comment>(`/plates/${plateId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ body }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', plateId] })
      queryClient.invalidateQueries({ queryKey: queryKeys.plates.detail(plateId) })
    },
  })
}
