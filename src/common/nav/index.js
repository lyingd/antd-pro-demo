import dynamic from 'dva/dynamic'
import isString from 'lodash/isString'
import home from './home'
import login from './login'

// models和routes都支持多层目录
const dynamicWrapper = (app, models, page) => dynamic({
  app,
  models: () => models.map(m => import(`../../models/${m.replace(/^\/+/, '')}.js`)),
  component: isString(page) ? () => import(`../../routes/${page.replace(/^\/+/, '')}`) : page,
})

// 纯json方式配置多重路由
const parseStaticNavData = (staticNavDatas, app) => staticNavDatas.map((navData) => {
  const data = {
    ...navData,
  }
  if (data.page) {
    data.component = dynamicWrapper(app, data.models || [], data.page)
  }
  if (data.children) {
    data.children = parseStaticNavData(data.children, app)
  }
  return data
})


// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', '/login/login'], () => import('../../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    children: parseStaticNavData(home, app),
  },
  {
    component: dynamicWrapper(app, [], () => import('../../layouts/UserLayout')),
    layout: 'UserLayout',
    children: parseStaticNavData(login, app),
  },
  {
    component: dynamicWrapper(app, [], () => import('../../layouts/BlankLayout')),
    layout: 'BlankLayout',
    children: {
      name: '使用文档',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
      icon: 'book',
    },
  },
]
