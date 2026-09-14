from datetime import datetime
from typing import Literal
from pydantic import BaseModel, Field


class OperationCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    amount: float = Field(gt=0)
    type: Literal["ingreso", "egreso"]
    owner: str = Field(min_length=1, max_length=100)


class OperationOut(BaseModel):
    id: int
    name: str
    amount: float
    type: str
    owner: str
    created_at: datetime

    class Config:
        from_attributes = True


class BalanceOut(BaseModel):
    owner: str
    balance: float
