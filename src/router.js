import React from 'react'
import { Route, Switch, routerRedux } from 'dva/router'
import { LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import dynamic from 'dva/dynamic'
import cloneDeep from 'lodash/cloneDeep'
import { getNavData } from 'src/common/nav'
import { getPlainNode } from 'src/utils/utils'

import styles from './index.less'

const { ConnectedRouter } = routerRedux

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />
})

function getRouteData(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null
  }
  const route = cloneDeep(navData.filter(item => item.layout === path)[0])
  const nodeList = getPlainNode(route.children)
  return nodeList
}

function getLayout(navData, path) {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null
  }
  const route = navData.filter(item => item.layout === path)[0]
  return {
    component: route.component,
    layout: route.layout,
    name: route.name,
    path: route.path,
  }
}

function RouterConfig({ history, app }) {
  const navData = getNavData(app)
  const UserLayout = getLayout(navData, 'UserLayout').component
  const BasicLayout = getLayout(navData, 'BasicLayout').component

  const passProps = {
    app,
    navData,
    getRouteData: (path) => {
      return getRouteData(navData, path)
    },
  }

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} {...passProps} />} />
          <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  )
}

export default RouterConfig
