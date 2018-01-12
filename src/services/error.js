import request from 'src/utils/request';

export async function query404() {
  return request('/api/404');
}

export async function query403() {
  return request('/api/403');
}

export async function query500() {
  return request('/api/500');
}
