const BASE = process.env.REACT_APP_API_URL || '';

const CLIENT_ID     = 'AdminApi';
const CLIENT_SECRET = 'adminclientsecret';
const SCOPE         = 'Api offline_access';

// POST /connect/token
export async function login(username, password) {
  const body = new URLSearchParams({
    client_id:     CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type:    'password',
    scope:         SCOPE,
    username,
    password,
  });

  const res = await fetch(`${BASE}/connect/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Ошибка авторизации: ${res.status}`);
  }

  const data = await res.json();
  // data.access_token, data.refresh_token, data.expires_in
  localStorage.setItem('token',         data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token || '');
  return data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}