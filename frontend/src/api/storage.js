// src/api/storage.js

const ANKETY_KEY = 'ankety_klient';
const MYJK_KEY   = 'myjk_zastr';

/* ─── АНКЕТЫ КЛИЕНТА ─── */
export function getAnkety() {
  try { return JSON.parse(localStorage.getItem(ANKETY_KEY)) || []; }
  catch { return []; }
}

export function saveAnketa(formData) {
  const list = getAnkety();
  const item = {
    id:        Date.now(),
    num:       30 + list.length,
    name:      formData.name || '',
    city:      formData.cities?.[0]    || '',
    aptType:   formData.aptTypes?.[0]  || '',
    area:      formData.areaMin        ? `${formData.areaMin} м²` : '',
    budget:    formData.budgetMax      ? `${Number(formData.budgetMax).toLocaleString('ru')} ₽` : '',
    finance:   formData.financeTools?.[0] || '',
    delivery:  '',
    status:    'Не просмотрено',
    createdAt: new Date().toISOString(),
  };
  list.push(item);
  localStorage.setItem(ANKETY_KEY, JSON.stringify(list));
  return item;
}

export function updateAnketaStatus(id, status) {
  const list = getAnkety().map(a => a.id === id ? { ...a, status } : a);
  localStorage.setItem(ANKETY_KEY, JSON.stringify(list));
}

/* ─── МОИ ЖК (ЗАСТРОЙЩИК) ─── */
export function getMyJK() {
  try { return JSON.parse(localStorage.getItem(MYJK_KEY)) || []; }
  catch { return []; }
}

export function saveMyJK(formData) {
  const list = getMyJK();
  const item = {
    id:        Date.now(),
    name:      formData.complexName || `ЖК ${list.length + 1}`,
    city:      formData.city        || '',
    delivery:  formData.delivery    || '',
    aptType:   formData.aptType     || '',
    area:      formData.area        || '',
    price:     formData.price       || '',
    viewed:    false,
    liked:     false,
    createdAt: new Date().toISOString(),
  };
  list.push(item);
  localStorage.setItem(MYJK_KEY, JSON.stringify(list));
  return item;
}

export function toggleJKLike(id) {
  const list = getMyJK().map(j => j.id === id ? { ...j, liked: !j.liked } : j);
  localStorage.setItem(MYJK_KEY, JSON.stringify(list));
}

export function markJKViewed(id) {
  const list = getMyJK().map(j => j.id === id ? { ...j, viewed: true } : j);
  localStorage.setItem(MYJK_KEY, JSON.stringify(list));
}