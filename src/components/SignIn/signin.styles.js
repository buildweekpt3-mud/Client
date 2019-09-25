const styles = ({ spacing, breakpoints, palette }) => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: spacing(3),
    marginRight: spacing(3),
    [breakpoints.up(400 + spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(2, 3, 3)
  },
  form: {
    width: '100%',
    marginTop: spacing(1)
  },
  submit: {
    marginTop: spacing(3)
  },
  signin: {
    display: 'block',
    width: '100%',
    marginTop: spacing(3),
    textDecoration: 'none',
    borderRadius: 5
  }
})
export default styles
