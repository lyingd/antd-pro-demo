import { routerRedux } from 'dva/router'
import { userLogin } from 'src/services/user'
import { getCurrentTimestamp } from 'src/utils/utils'

export default {
  namespace: 'login',

  state: {
    status: undefined,
    errorLogs: [],
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      })
      try {
        const response = yield call(userLogin, payload)
        if (response.status === 'ok') {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: response.status,
              errorLogs: [],
            },
          })
          yield put(routerRedux.push('/'))
        } else {
          yield put({
            type: 'logError',
            payload: {
              time: getCurrentTimestamp(),
            },
          })
        }
      } catch (e) {
        yield put({
          type: 'logError',
          payload: {
            time: getCurrentTimestamp(),
            error: e,
          },
        })
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      })
      yield put(routerRedux.push('/user/login'))
    },
  },

  reducers: {
    changeLoginStatus(state, { payload: { status, errorLogs = [] } }) {
      return {
        ...state,
        status,
        errorLogs,
        submitting: false,
      }
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      }
    },
    logError(state, { payload }) {
      return {
        ...state,
        errorLogs: [
          ...state.errorLogs,
          payload,
        ],
        status: 'error',
        submitting: false,
      }
    },
  },
}
