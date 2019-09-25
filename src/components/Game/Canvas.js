import React, { Component } from 'react'
import { FlexibleXYPlot, LineSeries, MarkSeries } from 'react-vis'
import isEquivalent from '../../services/isEquivalent'
// import visited_room_data from '../../data/visited_room_data.js'

class Canvas extends Component {
  state = {
    dataWithColor: [],
    links: []
  }
  componentDidMount() {
    this.updateMap()
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (
      !isEquivalent(
        this.props.visited_room_data,
        nextProps.visited_room_data
      ) ||
      this.props.currentRoom !== nextProps.currentRoom
    ) {
      this.updateMap()
    }
  }
  updateMap = _ => {
    const { currentRoom, visited_room_data } = this.props
    // Create arrays to hold point coordinates and links
    let coordinates = []
    let links = []
    // Loop through each room in the room_data object
    if (visited_room_data && visited_room_data[2])
      for (let room in visited_room_data) {
        // Set data equal to the first element (x, y coordinates)
        // in each room of the visited_room_data object
        let data = visited_room_data[room][0]
        coordinates.push(data)
        for (let adjacentRoom in visited_room_data[room][1]) {
          if (visited_room_data[visited_room_data[room][1][adjacentRoom]])
            links.push([
              visited_room_data[room][0],
              visited_room_data[visited_room_data[room][1][adjacentRoom]][0]
            ])
        }
      }
    const dataWithColor = coordinates.map((d, i) => {
      let final = { ...d, color: i === currentRoom ? '#F00' : '#DDD' }
      if (visited_room_data[i] && visited_room_data[i][5].visited === true) {
        final.color = '#F77'
      }
      return final
    })
    this.setState({ dataWithColor, links })
  }
  render() {
    return (
      <div>
        <FlexibleXYPlot width={600} height={600}>
          {this.state.links.map(link => (
            <LineSeries
              strokeWidth="2"
              color="#DDD"
              data={link}
              key={Math.random() * 100}
            />
          ))}
          <MarkSeries
            strokeWidth={3}
            opacity="1"
            size="3"
            colorType="literal"
            data={this.state.dataWithColor}
          />
        </FlexibleXYPlot>
      </div>
    )
  }
}

export default Canvas
