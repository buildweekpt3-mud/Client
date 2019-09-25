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

import styles from './signup.styles'

const SignUpForm = props => {
  const { classes, email, username, passwordOne, passwordTwo } = props

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={props.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              type="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={props.onChange}
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={props.onChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password1">Password</InputLabel>
            <Input
              type="password"
              id="password1"
              autoComplete="current-password"
              name="passwordOne"
              value={passwordOne}
              onChange={props.onChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password2">Re-enter Password</InputLabel>
            <Input
              type="password"
              id="password2"
              autoComplete="current-password"
              name="passwordTwo"
              value={passwordTwo}
              onChange={props.onChange}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign up
          </Button>
          <Link fullwidth="true" to="/signin" className={classes.signin}>
            <Button
              variant="contained"
              color="primary"
              className={classes.signin}>
              Sign in
            </Button>
          </Link>
        </form>
      </Paper>
    </main>
  )
}

export default withStyles(styles)(SignUpForm)
