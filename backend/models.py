from sqlalchemy import Column, Integer, String, Numeric, DateTime
from sqlalchemy.sql import func
from database import Base


class Operation(Base):
    __tablename__ = "operations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    type = Column(String, nullable=False)   # 'ingreso' | 'egreso'
    owner = Column(String, nullable=False)  # 'Fede' | 'Cochi'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
