
const login = (req, res) => {
  const { password, userName, type } = req.body
  const ret = password === '888888' && userName === '18888888888' ? {
    code: 0,
    data: {
      status: 'ok',
      type,
    },
  } : {
    code: -1,
    data: '用户名或密码错误',
  }
  res.send(ret)
}
const register = (req, res) => {
  res.send({ status: 'ok' })
}

export default {
  'POST /api/user/login': login,
  'POST /api/register': register,
}
