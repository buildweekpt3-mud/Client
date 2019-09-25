import React, { Suspense, Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { lightTheme, darkTheme } from './styles/maintheme'
import { Game, SignIn, SignUp } from './services/lazyImporter'

class App extends Component {
  state = {
    theme: 0
  }
  handleTheme = _ => {
    window.localStorage.setItem('theme', `${!this.state.theme}`)
    this.setState(prevState => ({ theme: !prevState.theme }))
  }
  componentDidMount() {
    const token = window.localStorage.getItem('Token')
    if (!window.localStorage.getItem('map')) {
      axios
        .get('https://djangomud.herokuapp.com/api/init', {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(res => {
          const room = res.data.room
          window.localStorage.setItem(
            'map',
            JSON.stringify({
              '1': [
                { x: 1, y: 1 },
                { ...room.directions },
                { title: room.title },
                { description: room.description },
                { items: room.items },
                { visited: true }
              ],
              '2': [{ x: 1, y: 2 }]
            })
          )
        })
        .catch(err => this.props.history.push('/signin'))
    }
    this.setState({
      theme: window.localStorage.getItem('theme') === 'true' ? 1 : 0
    })
  }
  render() {
    return (
      <MuiThemeProvider theme={this.state.theme ? lightTheme : darkTheme}>
        <Suspense fallback={'loading'}>
          <Switch>
            <Route exact path="/" component={Game} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(App)
