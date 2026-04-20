from __future__ import annotations

from datetime import UTC, datetime
from typing import Literal

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_current_user_optional
from app.api.v1.plates import plate_to_response
from app.db.models import Plate, PlateStatus, User, Vote
from app.db.session import get_db
from app.schemas.leaderboard import LeaderboardResponse

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])


async def _load_user_votes(
    db: AsyncSession, user: User | None, plate_ids: list
) -> dict:
    if not user or not plate_ids:
        return {}
    result = await db.execute(
        select(Vote.plate_id, Vote.value).where(
            Vote.user_id == user.id, Vote.plate_id.in_(plate_ids)
        )
    )
    return {row.plate_id: row.value for row in result}


@router.get("/overall", response_model=LeaderboardResponse)
async def leaderboard_overall(
    window: Literal["day", "week", "month", "all"] = Query(default="all"),
    limit: int = Query(default=50, ge=1, le=100),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
) -> LeaderboardResponse:
    stmt = (
        select(Plate)
        .where(Plate.status == PlateStatus.approved)
        .order_by(Plate.score.desc(), Plate.created_at.desc())
        .limit(limit)
    )

    if window == "day":
        stmt = stmt.where(Plate.created_at > func.now() - text("interval '1 day'"))
    elif window == "week":
        stmt = stmt.where(Plate.created_at > func.now() - text("interval '7 days'"))
    elif window == "month":
        stmt = stmt.where(Plate.created_at > func.now() - text("interval '30 days'"))

    result = await db.execute(stmt)
    plates = list(result.scalars().all())

    user_votes = await _load_user_votes(db, user, [p.id for p in plates])

    return LeaderboardResponse(
        items=[plate_to_response(p, user_votes.get(p.id, 0)) for p in plates],
        window=window,
        generated_at=datetime.now(UTC).isoformat(),
    )


@router.get("/state/{state_code}", response_model=LeaderboardResponse)
async def leaderboard_state(
    state_code: str,
    window: Literal["day", "week", "month", "all"] = Query(default="all"),
    limit: int = Query(default=10, ge=1, le=50),
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
) -> LeaderboardResponse:
    code = state_code.upper()
    stmt = (
        select(Plate)
        .where(Plate.status == PlateStatus.approved, Plate.state_code == code)
        .order_by(Plate.score.desc(), Plate.created_at.desc())
        .limit(limit)
    )

    if window == "day":
        stmt = stmt.where(Plate.created_at > func.now() - text("interval '1 day'"))
    elif window == "week":
        stmt = stmt.where(Plate.created_at > func.now() - text("interval '7 days'"))
    elif window == "month":
        stmt = stmt.where(Plate.created_at > func.now() - text("interval '30 days'"))

    result = await db.execute(stmt)
    plates = list(result.scalars().all())

    user_votes = await _load_user_votes(db, user, [p.id for p in plates])

    return LeaderboardResponse(
        items=[plate_to_response(p, user_votes.get(p.id, 0)) for p in plates],
        window=window,
        generated_at=datetime.now(UTC).isoformat(),
    )
