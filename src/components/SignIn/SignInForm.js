import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import { PasswordForgetLink } from '../passwordforget'
import styles from './signin.styles'

const LoginForm = props => {
  const { classes, username, password } = props

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={props.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              value={username}
              onChange={props.onChange}
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={props.onChange}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign in
          </Button>
          <Link fullwidth="true" to="/signup" className={classes.signin}>
            <Button
              variant="contained"
              color="primary"
              className={classes.signin}>
              Sign up
            </Button>
          </Link>
          <PasswordForgetLink />
        </form>
      </Paper>
    </main>
  )
}

export default withStyles(styles)(LoginForm)
