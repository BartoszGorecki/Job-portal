import React, { Component } from 'react'
import AuthAPI from '../api/AuthAPI'
import styled from 'styled-components'
import TextInputField from './TextInputField'
import { PrimaryButton } from './Button'
import Spinner from './Spinner'
import ErrorBox from './ErrorBox'

const LoginForm = styled.form`
  max-width: 420px;
  padding: 24px;
  margin: 0 auto;
  box-shadow: 0px 2px 40px 0 rgba(0, 0, 0, 0.1);
`
class LoginPage extends Component {
  state = {
    loading: false,
    username: '',
    password: '',
    error: undefined
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  // metoda loginMocked ustawia username i odpowiada promisem z tokenem itd
  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({
      error: undefined,
      loading: true
    })
    const { success, response, error } = await AuthAPI.loginMocked({
      username: this.state.username,
      password: this.state.password
    })
    if (success) {
      this.props.onLogin(response.data)
    } else {
      this.setState({
        error,
        loading: false
      })
    }
  }
  render() {
    const { error, password, loading } = this.state
    return (
      <LoginForm onSubmit={this.handleSubmit}>
        <TextInputField
          label="Username"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <TextInputField
          label="Password"
          name="password"
          onChange={this.handleChange}
          type="password"
          value={password}
        />
        <PrimaryButton disabled={loading}>
          Login
                </PrimaryButton>
        {loading && <Spinner />}
        {error && <ErrorBox label={error} />}
      </LoginForm>
    )
  }
}
export default LoginPage