import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
  Typography
} from '@material-ui/core'
import Canvas from './Canvas'
import TakeItems from './TakeItems/TakeItems'
import DropItems from './DropItems/DropItems'
import visited_room_data from '../../data/visited_room_data'
import styles from './game.styles'
import background from './background.png'
import top from './top.png'
import right from './right.png'
import bottom from './bottom.png'
import left from './left.png'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
  }
  state = {
    currentRoom: null,
    title: '',
    description: '',
    n: null,
    e: null,
    s: null,
    w: null,
    items: [],
    inventory: [],
    players: [],
    name: '...',
    open: false,
    openDrop: false,
    selectedItem: null
  }

  componentDidMount() {
    this.init()
  }
  init = _ => {
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
          inventory: res.data.inventory,
          description: room.description,
          n: room.directions.n,
          e: room.directions.e,
          s: room.directions.s,
          w: room.directions.w,
          items: room.items,
          players: res.data.players,
          name: res.data.name
        })
        this.child.current.updateMap()
      })
      .catch(err => this.props.history.push('/signin'))
  }
  setOpen = open => {
    this.setState({ open })
  }
  setOpenDrop = openDrop => {
    this.setState({ openDrop })
  }
  setItem = item => {
    this.setState({ selectedItem: item })
  }
  handleClickOpen = () => {
    this.setOpen(true)
  }
  handleClickOpenDrop = () => {
    this.setOpenDrop(true)
  }
  handleClose = _ => {
    this.setOpen(false)
  }
  handleCloseDrop = _ => {
    this.setOpenDrop(false)
  }
  onTakeDrop = items => {
    this.setState({ inventory: items, selectedItem: null })
    this.init()
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
        console.log(res)
        let room = res.data.room
        this.setState({
          currentRoom: room.id,
          title: room.title,
          description: room.description,
          n: room.directions.n,
          e: room.directions.e,
          s: room.directions.s,
          w: room.directions.w,
          items: room.items || [],
          players: res.data.players,
          name: res.data.name
        })
        this.child.current.updateMap()
      })
      .catch(err => console.log(err))
  }
  signout = _ => {
    console.log(`Token ${window.localStorage.getItem('Token')}`)
    axios
      .post(
        'https://djangomud.herokuapp.com/api/auth/logout',
        {},
        {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('Token')}`
          }
        }
      )
      .then(res => {
        console.log(res)
        window.localStorage.removeItem('map')
        window.localStorage.removeItem('Token')
        window.localStorage.removeItem('user')
        this.props.history.push('/signin')
      })
      .catch(err => console.log(err))
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <TakeItems
          onTake={this.onTakeDrop}
          items={this.state.items}
          open={this.state.open}
          onClose={this.handleClose}
          setValue={this.setItem}
          value={this.state.selectedItem}
        />
        <DropItems
          onDrop={this.onTakeDrop}
          items={this.state.inventory}
          open={this.state.openDrop}
          onClose={this.handleCloseDrop}
          setValue={this.setItem}
          value={this.state.selectedItem}
        />
        <div className={classes.topBar}>
          {this.state.name}

          <Button onClick={this.signout}>Sign Out</Button>
        </div>
        <div className={classes.gameContainer}>
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

          <Canvas
            ref={this.child}
            currentRoom={this.state.currentRoom}
            visited_room_data={visited_room_data}></Canvas>
        </div>
        <div className={classes.bottomBar}>
          <div className={classes.room}>
            <Typography variant="h4">{this.state.title}</Typography>
            <Typography variant="subtitle1">
              {this.state.description}
            </Typography>
          </div>

          <div className={classes.listContainer}>
            <div>Items in Room:</div>
            <List className={classes.lists} dense>
              {this.state.items.map((item, i) => (
                <ListItem key={('item-', i)}>
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
              {this.state.players.map((name, i) => (
                <ListItem key={('player-', i)}>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.listContainer}>
            <div>Inventory:</div>
            <List className={classes.lists} dense>
              {this.state.inventory.map((item, i) => (
                <ListItem key={('inventory-', i)}>
                  <ListItemText
                    primary={item.name}
                    secondary={item.description}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <ButtonGroup
            className={classes.buttons}
            size="large"
            aria-label="large outlined button group">
            <Button onClick={this.handleClickOpen}>Take</Button>
            <Button onClick={this.handleClickOpenDrop}>Drop</Button>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Game)
