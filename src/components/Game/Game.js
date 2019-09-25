import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
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
    players: []
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
          players: res.data.players
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
          players: res.data.players
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.game}>
          {/* <Canvas
            currentRoom={this.state.currentRoom}
            visited_room_data={JSON.parse(window.localStorage.getItem('map'))}
          /> */}
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
      </div>
    )
  }
}

export default withStyles(styles)(Game)
