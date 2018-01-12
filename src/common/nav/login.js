import React from 'react'
import Route from 'src/components/Route'

export default
  <Route name="用户登录" layout="UserLayout" page={() => import('../../layouts/UserLayout')}>
    <Route name="帐户" path="/user" icon="user">
      <Route name="登录" path="/login" models={['/login/login']} page="/User/Login" />
      <Route name="注册" path="/register" models={['/login/register']} page="/User/Register" />
      <Route name="注册结果" path="/register-result" page="/User/RegisterResult" />
    </Route>
  </Route>

