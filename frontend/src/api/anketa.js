import { request } from './client';
import { FLAT_TYPE, FINISHING_TYPE, METRO_TIME, EURO_FLAT_TYPE } from './enums';

export function buildAnketaPayload(form) {
  const {
    cities    = [], metros   = [], districts = [],
    metroTime = [], aptTypes = [], euroTypes = [],
    euroFormat = false,
    areaMin = '', areaMax = '',
    floorMin = 1, floorMax = 53,
    finishes  = [],
    budgetMin = '', budgetMax = '',
  } = form;

  const flatTypeSource = euroFormat && euroTypes.length > 0 ? euroTypes : aptTypes;
  const firstFlat      = flatTypeSource[0] ?? null;
  const flatType       = firstFlat
    ? (euroFormat ? (EURO_FLAT_TYPE[firstFlat] ?? 0) : (FLAT_TYPE[firstFlat] ?? 0))
    : 0;

  const finishingType = finishes[0]  ? (FINISHING_TYPE[finishes[0]]  ?? 0) : 0;
  const metroTimeVal  = metroTime[0] ? (METRO_TIME[metroTime[0]]     ?? 0) : 0;

  const toInt = (val) => {
    const n = parseInt(val);
    return isNaN(n) ? 0 : n;
  };

  return {
    cityList:        cities.length    > 0 ? cities    : [],
    districtList:    districts.length > 0 ? districts : [],
    metroList:       metros.length    > 0 ? metros    : [],
    metroTime:       metroTimeVal,
    flatType:        flatType,
    finishingType:   finishingType,
    isEuro:          euroFormat,
    minSquare:       toInt(areaMin),
    maxSquare:       toInt(areaMax),
    floorPreference: toInt(floorMax),
    minPrice:        toInt(budgetMin),
    maxPrice:        toInt(budgetMax),
    isMortgage:      false,
    downPayment:     0,
  };
}

export function createAnketa(form) {
  const payload = buildAnketaPayload(form);
  console.log(' Отправляем на бек:', JSON.stringify(payload, null, 2));
  return request('POST', '/api/anketa', payload);
}

export function getAnketa(id) {
  return request('GET', `/api/anketa/${id}`);
}

export function getAnketaList() {
  return request('GET', '/api/anketa/list');
}

export function deleteAnketa(id) {
  return request('DELETE', `/api/anketa?id=${id}`);
}

export function toggleAnketa(id) {
  return request('PATCH', `/api/anketa/toggle?anketaId=${id}`);
}