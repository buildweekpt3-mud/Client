import React from 'react'
import Canvas from './Canvas'

class Game extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <div>
          <Canvas />
        </div>
      </div>
    )
  }
}

export default Game
