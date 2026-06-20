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
const PROFILE_NAMES     = ['Vos', 'Tu novia'];                 // ← pongan sus nombres
```

Guardá el archivo.

> 💡 Si ya habías creado la tabla `operations` antes (de una configuración previa),
> en vez de `setup.sql` ejecutá `migration.sql` en el SQL Editor de Supabase —
> agrega la columna nueva sin borrar tus datos.

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

## Perfiles (vos y tu novia)

La primera vez que cada uno entra a la app, va a aparecer una pantalla para elegir su nombre. Esa elección queda guardada en el navegador de ese equipo, así que cada quien ve solo sus propias operaciones — el saldo, los ingresos y los egresos no se mezclan.

- El nombre elegido aparece como una etiqueta arriba a la derecha, en el menú
- Tocando esa etiqueta podés cambiar de perfil (útil si comparten el mismo equipo)
- Cada perfil tiene su propio saldo, su propia lista de ingresos y su propia lista de egresos

**Importante:** esto no es un login con contraseña, es solo una forma de separar los datos para que no se confundan. Cualquiera que abra la app puede elegir cualquiera de los dos nombres. Como charlamos, esto está bien porque no es información sensible — si en algún momento quisieran privacidad real entre cuentas, ahí sí conviene sumar Supabase Auth.

---

## Seguridad

La `anon key` de Supabase está diseñada para ser pública — la seguridad la maneja Supabase internamente a través de Row Level Security. Para un uso personal esto es suficiente.

Si en algún momento querés agregar login (para que nadie más pueda ver tus datos), se puede hacer fácil con Supabase Auth.
