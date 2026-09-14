import os
from typing import Optional, List

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import Base, engine, get_db
from models import Operation
from schemas import OperationCreate, OperationOut, BalanceOut

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Finanzas Personales API")

# En Render/Railway configurá FRONTEND_ORIGIN con la URL real de tu
# GitHub Pages (ej: https://TU_USUARIO.github.io) para no dejar "*" en producción.
origins = os.getenv("FRONTEND_ORIGIN", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins.split(",")],
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok", "service": "finanzas-api"}


@app.get("/api/operations", response_model=List[OperationOut])
def list_operations(
    owner: str,
    type: Optional[str] = None,
    db: Session = Depends(get_db),
):
    q = db.query(Operation).filter(Operation.owner == owner)
    if type:
        q = q.filter(Operation.type == type)
    return q.order_by(Operation.created_at.desc()).all()


@app.get("/api/balance", response_model=BalanceOut)
def get_balance(owner: str, db: Session = Depends(get_db)):
    ingresos = db.query(func.coalesce(func.sum(Operation.amount), 0)).filter(
        Operation.owner == owner, Operation.type == "ingreso"
    ).scalar()
    egresos = db.query(func.coalesce(func.sum(Operation.amount), 0)).filter(
        Operation.owner == owner, Operation.type == "egreso"
    ).scalar()
    return {"owner": owner, "balance": float(ingresos) - float(egresos)}


@app.post("/api/operations", response_model=OperationOut, status_code=201)
def create_operation(payload: OperationCreate, db: Session = Depends(get_db)):
    op = Operation(**payload.model_dump())
    db.add(op)
    db.commit()
    db.refresh(op)
    return op


@app.delete("/api/operations/{operation_id}", status_code=204)
def delete_operation(operation_id: int, db: Session = Depends(get_db)):
    op = db.query(Operation).filter(Operation.id == operation_id).first()
    if not op:
        raise HTTPException(status_code=404, detail="Operación no encontrada")
    db.delete(op)
    db.commit()
    return None
