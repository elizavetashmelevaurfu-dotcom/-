import { request } from './client';

// POST /api/profile/registration
export function register({ userName, email, password }) {
  return request('POST', '/api/profile/registration', { userName, email, password });
}

// PATCH /api/profile/password
export function changePassword({ oldPassword, newPassword }) {
  return request('PATCH', '/api/profile/password', { oldPassword, newPassword });
}

// PATCH /api/profile/email
export function changeEmail({ newEmail }) {
  return request('PATCH', '/api/profile/email', { newEmail });
}