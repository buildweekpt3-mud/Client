import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import SignInForm from './SignInForm.js'

import {
  Snackbar,
  SnackbarContent,
  IconButton,
  CssBaseline
} from '@material-ui/core'

import { Error, Close } from '@material-ui/icons'
import { red } from '@material-ui/core/colors'

const INITIAL_STATE = {
  username: '',
  password: '',
  error: null,
  open: false
}

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

class SignIn extends React.Component {
  state = {
    ...INITIAL_STATE
  }
  onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }
  onSubmit = e => {
    e.preventDefault()
    const isInvalid = this.state.password === '' || this.state.username === ''
    if (!isInvalid) {
      const { username, password } = this.state
      axios
        .post('https://djangomud.herokuapp.com/api/auth/login', {
          username,
          password
        })
        .then(res => {
          window.localStorage.setItem('Token', res.data.token)
          window.localStorage.setItem('user', JSON.stringify(res.data.user))
          this.props.history.push('/')
        })
    } else {
      this.setState({
        error: { message: 'Incorrect Username/Password' },
        open: true
      })
    }
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.onClose}
          style={{ margin: '3.5rem 0', left: 'calc(50% + 27px)' }}>
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <span
                id="client-snackbar"
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <Error
                  style={{
                    fontSize: 20,
                    opacity: 0.9,
                    marginRight: '8px'
                  }}
                />
                {this.state.error && this.state.error.message}
              </span>
            }
            style={{ backgroundColor: red[700] }}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.onClose}>
                <Close style={{ fontSize: 20 }} />
              </IconButton>
            ]}
          />
        </Snackbar>
        <SignInForm onChange={this.onChange} onSubmit={this.onSubmit} />
      </>
    )
  }
}

export default withRouter(SignIn)
