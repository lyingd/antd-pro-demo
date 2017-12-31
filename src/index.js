import 'babel-polyfill'
import dva from 'dva'
import 'moment/locale/zh-cn'
import { persistStore, autoRehydrate } from 'redux-persist'
import './g2'
import './rollbar'
// import browserHistory from 'history/createBrowserHistory'
import './index.less'

// 1. Initialize
const app = dva({
  // history: browserHistory(),
  extraEnhancers: [autoRehydrate()],
})

// 2. Plugins
// app.use({})

// 3. Register global model
app.model(require('~src/models/global'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')

persistStore(app._store)
