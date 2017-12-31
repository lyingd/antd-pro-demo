import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Icon, Checkbox, Row, Col, Alert } from 'antd'
import styles from './Login.less'
import { MAX_LOGIN_ERROR_COUNT, MAX_LOGIN_ERROR_TIME } from '~src/common/const'
import { getCurrentTimestamp } from '~src/utils/utils'

const FormItem = Form.Item

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {
  state = {
    count: 0,
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onSwitch = (type) => {
    this.setState({ type })
  }

  onGetCaptcha = () => {
    let count = 59
    this.setState({ count })
    this.interval = setInterval(() => {
      count -= 1
      this.setState({ count })
      if (count === 0) {
        clearInterval(this.interval)
      }
    }, 1000)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'login/login',
            payload: {
              ...values,
              type: this.state.type,
            },
          })
        }
      }
    )
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    )
  }

  renderCaptcha = () => {
    const { form, login } = this.props
    const { getFieldDecorator } = form
    const { errorLogs } = login
    const { count } = this.state
    const currentTime = getCurrentTimestamp()
    const showCaptcha = errorLogs.filter(log => currentTime - log.time <= MAX_LOGIN_ERROR_TIME)
      .length >= MAX_LOGIN_ERROR_COUNT
    if (!showCaptcha) {
      return null
    }
    return (
      <FormItem>
        <Row gutter={8}>
          <Col span={16}>
            {getFieldDecorator('captcha', {
              rules: [{
                required: true, message: '请输入验证码！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="mail" className={styles.prefixIcon} />}
                placeholder="验证码"
              />
              )}
          </Col>
          <Col span={8}>
            <Button
              disabled={count}
              className={styles.getCaptcha}
              size="large"
              onClick={this.onGetCaptcha}
            >
              {count ? `${count} s` : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </FormItem>
    )
  }

  render() {
    const { form, login } = this.props
    const { getFieldDecorator } = form
    const { errorLogs = [] } = login
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          {
            login.status === 'error' &&
            login.submitting === false &&
            this.renderMessage(errorLogs.length > 0
              ? errorLogs[errorLogs.length - 1].error.message
              : '账号或密码错误')
          }
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{
                required: true, message: '请输入账户名！',
              }, {
                pattern: /^1\d{10}$/, message: '账户名格式错误，应为手机号码！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="admin"
              />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                type="password"
                placeholder="888888"
              />
              )}
          </FormItem>
          {this.renderCaptcha()}
          <FormItem className={styles.additional}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className={styles.autoLogin}>自动登录</Checkbox>
              )}
            <a className={styles.forgot} href="">忘记密码</a>
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
