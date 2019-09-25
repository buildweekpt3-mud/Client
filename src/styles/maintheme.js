import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = {
  primary: {
    light: '#ff755a',
    main: '#ff3d2e',
    dark: '#c30002',
    contrastText: '#fff'
  },
  secondary: {
    light: '#5393ff',
    main: '#2979ff',
    dark: '#1c54b2',
    contrastText: '#272F32'
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'Pacifico'
    ].join(',')
  }
}

export const lightTheme = createMuiTheme({
  palette: { ...defaultTheme, type: 'light' }
})
export const darkTheme = createMuiTheme({
  palette: { ...defaultTheme, type: 'dark' }
})
