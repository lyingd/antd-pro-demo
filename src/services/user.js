import request from '~src/utils/request'

export async function query() {
  return request('/api/users')
}

export async function queryCurrent() {
  return request('/api/currentUser')
}

export async function userLogin(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: params,
    showError: false,
  })
}
