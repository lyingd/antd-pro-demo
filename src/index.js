import '@babel/polyfill'
import dva from 'dva'
import { persistStore, autoRehydrate } from 'redux-persist'


import createHistory from 'history/createHashHistory'
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading'
import 'moment/locale/zh-cn'
import FastClick from 'fastclick'
import './rollbar'
import onError from './error'

import './index.less'
// 1. Initialize
const app = dva({
  history: createHistory(),
  extraEnhancers: [autoRehydrate()],
  onError,
})

// 2. Plugins
app.use(createLoading())

// 3. Register global model
app.model(require('./models/global').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
persistStore(app._store)
FastClick.attach(document.body)
