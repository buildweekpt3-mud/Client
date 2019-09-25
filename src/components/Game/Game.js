import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup
} from '@material-ui/core'
import Canvas from './Canvas'
import styles from './game.styles'
import background from './background.png'
import top from './top.png'
import right from './right.png'
import bottom from './bottom.png'
import left from './left.png'

class Game extends React.Component {
  state = {
    currentRoom: null,
    title: '',
    description: '',
    n: null,
    e: null,
    s: null,
    w: null,
    items: [],
    players: [],
    name: '...'
  }
  componentDidMount() {
    axios
      .get('https://djangomud.herokuapp.com/api/init', {
        headers: {
          Authorization: `Token ${window.localStorage.getItem('Token')}`
        }
      })
      .then(res => {
        let room = res.data.room
        this.setState({
          currentRoom: room.id,
          title: room.title,
          description: room.description,
          n: room.directions.n,
          e: room.directions.e,
          s: room.directions.s,
          w: room.directions.w,
          items: room.items,
          players: res.data.players,
          name: res.data.name
        })
      })
      .catch(err => console.log(err))
  }
  handleMove = e => {
    axios
      .post(
        'https://djangomud.herokuapp.com/api/move',
        { direction: e.target.name },
        {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('Token')}`
          }
        }
      )
      .then(res => {
        let room = res.data.room
        this.setState({
          currentRoom: room.id,
          title: room.title,
          description: room.description,
          n: room.directions.n,
          e: room.directions.e,
          s: room.directions.s,
          w: room.directions.w,
          items: room.items,
          players: res.data.players,
          name: res.data.name
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.topBar}>{this.state.name}</div>
        <div className={classes.game}>
          <img
            className={classes.background}
            src={background}
            alt="dungeon background"
          />
          {this.state.n ? (
            <img
              className={classes.top}
              name="n"
              src={top}
              onClick={this.handleMove}
              alt="north door"
            />
          ) : null}
          {this.state.e ? (
            <img
              className={classes.right}
              name="e"
              src={right}
              onClick={this.handleMove}
              alt="east door"
            />
          ) : null}
          {this.state.s ? (
            <img
              className={classes.bottom}
              name="s"
              src={bottom}
              onClick={this.handleMove}
              alt="south door"
            />
          ) : null}
          {this.state.w ? (
            <img
              className={classes.left}
              name="w"
              src={left}
              onClick={this.handleMove}
              alt="west door"
            />
          ) : null}
        </div>
        <div className={classes.bottomBar}>
          <ButtonGroup
            className={classes.buttons}
            size="large"
            aria-label="large outlined button group">
            <Button>Take</Button>
            <Button>Drop</Button>
          </ButtonGroup>
          <div className={classes.listContainer}>
            <div>Items in Room:</div>
            <List className={classes.lists} dense>
              {this.state.items.map(item => (
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={item.description}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.listContainer}>
            <div>Other Players in Room:</div>
            <List className={classes.lists} dense>
              {this.state.players.map(name => (
                <ListItem>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Game)
