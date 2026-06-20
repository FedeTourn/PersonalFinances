// ─────────────────────────────────────────────────────────────────────
//  profile.js — selector de perfil simple (sin login real).
//  Guarda el nombre elegido en localStorage de ESE navegador/equipo,
//  y se usa para filtrar y etiquetar las operaciones de cada persona.
// ─────────────────────────────────────────────────────────────────────

const PROFILE_KEY = 'finanzas_profile';

function getProfile()      { return localStorage.getItem(PROFILE_KEY); }
function setProfile(name)  { localStorage.setItem(PROFILE_KEY, name); }
function clearProfile()    { localStorage.removeItem(PROFILE_KEY); }

function showProfilePicker(onPick) {
  const overlay = document.createElement('div');
  overlay.className = 'profile-overlay';
  overlay.innerHTML = `
    <div class="profile-card">
      <div class="profile-eyebrow">¿Quién sos?</div>
      <div class="profile-options">
        ${PROFILE_NAMES.map(n => `
          <button class="profile-opt" data-name="${n}">
            <span class="profile-avatar">${n.charAt(0).toUpperCase()}</span>
            <span>${n}</span>
          </button>`).join('')}
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelectorAll('.profile-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      setProfile(name);
      overlay.remove();
      onPick(name);
    });
  });
}

function initProfileBadge(currentName) {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const badge = document.createElement('div');
  badge.className = 'profile-badge';
  badge.textContent = currentName;
  badge.title = 'Tocá para cambiar de perfil';
  badge.onclick = () => {
    if (confirm(`Estás como "${currentName}". ¿Cambiar de perfil?`)) {
      clearProfile();
      location.reload();
    }
  };
  nav.appendChild(badge);
}

// Llama a callback(nombrePerfil) una vez que hay un perfil activo,
// mostrando el selector si todavía no se eligió ninguno.
function requireProfile(callback) {
  const existing = getProfile();
  if (existing) {
    initProfileBadge(existing);
    callback(existing);
  } else {
    showProfilePicker(name => {
      initProfileBadge(name);
      callback(name);
    });
  }
}
