# 🪙 Finanzas Personales

App web para llevar control de ingresos y egresos. Datos en la nube con Supabase, hosteada gratis en GitHub Pages.

---

## Pasos para poner todo en línea

### PASO 1 — Configurar Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta gratuita
2. Hacé clic en **New project** → dale un nombre (ej: `finanzas`) → elegí una región → creá el proyecto
3. Una vez creado, andá a **SQL Editor** (menú izquierdo)
4. Pegá todo el contenido del archivo `setup.sql` y hacé clic en **Run**
5. Andá a **Settings → API** (menú izquierdo)
6. Copiá:
   - **Project URL** → algo como `https://xxxxxxxxxxxx.supabase.co`
   - **anon / public key** → una clave larga que empieza con `eyJ...`

### PASO 2 — Completar `config.js`

Abrí el archivo `config.js` y reemplazá los placeholders con tus datos:

```js
const SUPABASE_URL      = 'https://xxxxxxxxxxxx.supabase.co';  // ← tu URL
const SUPABASE_ANON_KEY = 'eyJ...';                            // ← tu anon key
```

Guardá el archivo.

---

### PASO 3 — Subir a GitHub Pages

1. Entrá a [github.com](https://github.com) y creá una cuenta si no tenés
2. Hacé clic en **New repository** (botón verde)
   - Nombre: `finanzas` (o el que quieras)
   - Dejalo en **Public**
   - No agregues ningún archivo extra
   - Hacé clic en **Create repository**
3. En la página del repositorio vacío, hacé clic en **uploading an existing file**
4. Arrastrá o seleccioná **todos** los archivos de esta carpeta:
   - `index.html`
   - `ingresos.html`
   - `egresos.html`
   - `styles.css`
   - `config.js` ← (ya con tus credenciales del Paso 2)
5. Hacé clic en **Commit changes**
6. Andá a **Settings** (tab superior del repo) → **Pages** (menú izquierdo)
7. En **Source**, seleccioná **Deploy from a branch**
8. En **Branch**, elegí `main` → `/ (root)` → **Save**
9. Esperá 1-2 minutos y recargá la página

Tu URL va a ser: `https://TU_USUARIO.github.io/finanzas/`

---

## Uso desde cualquier equipo

Con la URL de arriba podés acceder desde la compu, el celu, o cualquier dispositivo. Los datos están en Supabase así que son compartidos en todos lados en tiempo real.

---

## Seguridad

La `anon key` de Supabase está diseñada para ser pública — la seguridad la maneja Supabase internamente a través de Row Level Security. Para un uso personal esto es suficiente.

Si en algún momento querés agregar login (para que nadie más pueda ver tus datos), se puede hacer fácil con Supabase Auth.
