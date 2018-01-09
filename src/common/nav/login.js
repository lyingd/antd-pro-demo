export default [
  {
    name: '帐户',
    icon: 'user',
    path: '/user',
    children: [
      {
        name: '登录',
        path: '/login',
        models: ['/login/login'],
        page: '/User/Login',
      },
      {
        name: '注册',
        path: '/register',
        models: ['/login/register'],
        page: '/User/Register',
      },
      {
        name: '注册结果',
        path: '/register-result',
        page: '/User/RegisterResult',
      },
    ],
  },
]
