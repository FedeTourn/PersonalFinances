# 🪙 Finanzas Personales — Migración a backend propio (FastAPI + Render)

Esto reemplaza a Supabase por un backend tuyo, escrito en Python con FastAPI,
con su propia base de datos Postgres. El frontend (HTML/CSS/JS) sigue siendo
el mismo en espíritu, solo que ahora habla con tu API en vez de con Supabase.

## Qué cambió

- **Antes**: el navegador le pegaba directo a Supabase con la `anon key` expuesta.
- **Ahora**: el navegador le pega a tu API (`/api/operations`, `/api/balance`),
  y es tu servidor el que habla con la base de datos. La base de datos ya no
  es accesible directamente desde internet.
- El selector de perfil (Fede / Cochi) sigue funcionando igual que antes
  (sin login real, como pediste).

## Estructura

```
migration/
  backend/          ← API en FastAPI
    main.py
    models.py
    schemas.py
    database.py
    requirements.txt
    render.yaml
  frontend/         ← Mismo sitio de antes, pero apuntando a tu API
    index.html
    ingresos.html
    egresos.html
    config.js
    api.js
    profile.js
    styles.css
```

---

## PASO 1 — Subir el backend a GitHub

Creá un repo nuevo (o una carpeta `backend/` dentro del actual) y subí todo
el contenido de `backend/`.

## PASO 2 — Desplegar en Render

### Opción A — Con el archivo `render.yaml` (recomendado, un clic)

1. Entrá a [render.com](https://render.com) y creá una cuenta (podés usar GitHub)
2. Click en **New** → **Blueprint**
3. Conectá el repo donde subiste `backend/` (con el `render.yaml` adentro)
4. Render va a detectar el `render.yaml` y va a crear automáticamente:
   - El servicio web (`finanzas-api`) — plan free
   - Una base de datos Postgres (`finanzas-db`) — plan free
5. Antes de confirmar, editá la variable `FRONTEND_ORIGIN` en el blueprint
   y poné la URL real de tu GitHub Pages (ej: `https://tuusuario.github.io`)
6. Click en **Apply** y esperá el deploy (2-3 minutos)
7. Cuando termine, copiá la URL pública que te da Render, algo como:
   `https://finanzas-api.onrender.com`

### Opción B — Manual

1. **New** → **PostgreSQL** → creá la base (plan free) → copiá el **Internal Database URL**
2. **New** → **Web Service** → conectá el repo del backend
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. En **Environment**, agregá:
   - `DATABASE_URL` = la URL que copiaste de la base
   - `FRONTEND_ORIGIN` = la URL de tu GitHub Pages
4. Deploy y copiá la URL pública del servicio

> ⚠️ Nota sobre el plan free de Render: el servicio web "se duerme" tras
> ~15 min sin uso, y tarda unos segundos en despertar en el próximo pedido.
> Para uso personal esto normalmente no molesta.

## PASO 3 — Configurar el frontend

Abrí `frontend/config.js` y poné la URL de tu backend:

```js
const API_BASE_URL = 'https://finanzas-api.onrender.com';
```

## PASO 4 — Subir el frontend a GitHub Pages

Igual que antes: subí todos los archivos de `frontend/` a tu repo de GitHub
Pages y activá Pages desde Settings → Pages → Deploy from branch → main.

## PASO 5 — Probar

Entrá a tu URL de GitHub Pages, elegí un perfil, y cargá un ingreso o egreso.
Si algo falla, abrí la consola del navegador (F12) — vas a ver el error de
`fetch` ahí. Los errores más comunes:

- **CORS bloqueado**: revisá que `FRONTEND_ORIGIN` en Render coincida
  exactamente con tu URL de GitHub Pages (sin barra final).
- **"Failed to fetch"**: el backend puede estar "durmiendo" (plan free) —
  esperá unos segundos y reintentá.

---

## Desarrollo local (probar antes de desplegar)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Esto levanta el backend en `http://127.0.0.1:8000` usando SQLite localmente
(no hace falta Postgres para probar). Documentación interactiva automática
disponible en `http://127.0.0.1:8000/docs`.

Para probar el frontend contra tu backend local, poné en `config.js`:
```js
const API_BASE_URL = 'http://127.0.0.1:8000';
```
y abrí `index.html` con Live Server o similar (no como `file://`, porque
`fetch` necesita que sea servido por http).

---

## Qué es fácil sumar después

- **Auth real** (usuario + contraseña): agregar tabla `users`, hashing con
  `passlib`, y JWT con `python-jose`. Lo dejamos afuera porque dijiste que
  el selector de perfil te alcanza por ahora.
- **Editar operaciones** (no solo crear/borrar): un endpoint `PUT /api/operations/{id}`.
- **Categorías, filtros por fecha, exportar a CSV**, etc. — todo esto es
  mucho más natural de agregar ahora que tenés un backend propio con
  lógica en Python, en vez de depender de lo que Supabase expone.
