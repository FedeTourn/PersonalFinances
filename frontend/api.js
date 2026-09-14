// ─────────────────────────────────────────────────────────────────────
//  api.js — reemplaza al cliente de Supabase.
//  Llama al backend FastAPI usando fetch().
// ─────────────────────────────────────────────────────────────────────

async function apiGetOperations(owner, type) {
  const params = new URLSearchParams({ owner });
  if (type) params.set('type', type);
  const res = await fetch(`${API_BASE_URL}/api/operations?${params}`);
  if (!res.ok) throw new Error('No se pudieron cargar las operaciones');
  return res.json();
}

async function apiGetBalance(owner) {
  const params = new URLSearchParams({ owner });
  const res = await fetch(`${API_BASE_URL}/api/balance?${params}`);
  if (!res.ok) throw new Error('No se pudo cargar el saldo');
  return res.json(); // { owner, balance }
}

async function apiCreateOperation({ name, amount, type, owner }) {
  const res = await fetch(`${API_BASE_URL}/api/operations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, amount, type, owner }),
  });
  if (!res.ok) throw new Error('No se pudo guardar la operación');
  return res.json();
}

async function apiDeleteOperation(id) {
  const res = await fetch(`${API_BASE_URL}/api/operations/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('No se pudo eliminar la operación');
}
