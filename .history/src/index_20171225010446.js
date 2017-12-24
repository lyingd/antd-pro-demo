import 'babel-polyfill'
import dva from 'dva'
import 'moment/locale/zh-cn'
import './g2'
import './rollbar'
// import browserHistory from 'history/createBrowserHistory'
import './index.less'

// 1. Initialize
const app = dva({
  // history: browserHistory(),
})

// 2. Plugins
// app.use({})

// 3. Register global model
app.model(require('~/models/global'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')

const obj = {
  foo: {
    bar: {
      baz: class {
      },
    },
  },
}

const baz = new obj?.foo?.bar?.baz() // baz instance
 
const safe = new obj?.qux?.baz() // undefined
const safe2 = new obj?.foo.bar.qux?.() // undefined
 
const willThrow = new obj?.foo.bar.qux()
