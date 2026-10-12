const BASE = process.env.REACT_APP_API_URL || '';

const getToken = () => localStorage.getItem('token');

export async function request(method, path, body) {
  const token = getToken();
  
  console.log(' Токен при запросе:', token ? token.slice(0, 30) + '...' : 'НЕТ ТОКЕНА');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  console.log(' Заголовки:', headers);

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null;

  return res.json();
}