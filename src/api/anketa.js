import { request } from './client';
import { FLAT_TYPE, FINISHING_TYPE, METRO_TIME, EURO_FLAT_TYPE } from './enums';

// Собирает данные формы в формат бека
export function buildAnketaPayload(form) {
  const {
    cities, metros, districts,
    metroTime,           // массив строк: ['5', '5-10', ...]
    aptTypes,            // массив строк: ['Студия', '1к квартира', ...]
    euroFormat,
    euroTypes,           // массив строк: ['Евро 1к', ...]
    areaMin, areaMax,
    floorMin, floorMax,
    finishes,            // массив строк
    budgetMin, budgetMax,
  } = form;

  // Тип квартиры: если евро — берём из euroTypes, иначе из aptTypes
  const flatTypeSource = euroFormat && euroTypes.length > 0 ? euroTypes : aptTypes;
  const firstFlat = flatTypeSource[0];
  const flatType = euroFormat
    ? (EURO_FLAT_TYPE[firstFlat] ?? 0)
    : (FLAT_TYPE[firstFlat] ?? 0);

  // Тип отделки — берём первый выбранный
  const finishingType = FINISHING_TYPE[finishes[0]] ?? 0;

  // Время до метро — берём первое выбранное
  const metroTimeVal = METRO_TIME[metroTime[0]] ?? 0;

  return {
    cityList:         cities,
    districtList:     districts,
    metroList:        metros,
    metroTime:        metroTimeVal,
    flatType:         flatType,
    finishingType:    finishingType,
    isEuro:           euroFormat,
    minSquare:        areaMin    ? parseInt(areaMin)    : null,
    maxSquare:        areaMax    ? parseInt(areaMax)    : null,
    floorPreference:  floorMin   ? parseInt(floorMin)   : null,
    minPrice:         budgetMin  ? parseInt(budgetMin)  : null,
    maxPrice:         budgetMax  ? parseInt(budgetMax)  : null,
    isMortgage:       false,
    downPayment:      null,
  };
}

// POST /api/anketa — создать анкету
export function createAnketa(form) {
  const payload = buildAnketaPayload(form);
  return request('POST', '/api/anketa', payload);
}

// GET /api/anketa/{id} — получить анкету
export function getAnketa(id) {
  return request('GET', `/api/anketa/${id}`);
}

// GET /api/anketa/list — список анкет
export function getAnketaList() {
  return request('GET', '/api/anketa/list');
}

// DELETE /api/anketa?id=...
export function deleteAnketa(id) {
  return request('DELETE', `/api/anketa?id=${id}`);
}

// PATCH /api/anketa/toggle
export function toggleAnketa(anketaId) {
  return request('PATCH', `/api/anketa/toggle?anketaId=${anketaId}`);
}