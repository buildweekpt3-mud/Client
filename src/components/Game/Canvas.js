import React, { Component } from 'react'
import { FlexibleXYPlot, LineSeries, MarkSeries } from 'react-vis'
// import visited_room_data from '../../data/visited_room_data.js'

class Canvas extends Component {
  state = {
    currentRoom: 0
  }
  render() {
    let visited_room_data = JSON.parse(window.localStorage.getItem('map'))
    const { currentRoom } = this.state
    // Create arrays to hold point coordinates and links
    const coordinates = []
    const links = []

    // Loop through each room in the room_data object
    if (visited_room_data[2]) {
      for (let room in visited_room_data) {
        // Set data equal to the first element (x, y coordinates)
        // in each room of the visited_room_data object
        let data = visited_room_data[room][0]
        coordinates.push(data)
        for (let adjacentRoom in visited_room_data[room][1]) {
          console.log(
            visited_room_data[visited_room_data[room][1][adjacentRoom]]
          )
          links.push([
            visited_room_data[room][0],
            visited_room_data[visited_room_data[room][1][adjacentRoom]][0]
          ])
        }
      }
    }

    const dataWithColor = coordinates.map((d, i) => {
      let final = { ...d, color: i === currentRoom ? '#F00' : '#DDD' }
      if (visited_room_data[i] && visited_room_data[i][5].visited === true) {
        final.color = '#F77'
      }

      return final
    })

    return (
      <div>
        <FlexibleXYPlot width={600} height={600}>
          {links.map(link => (
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
            data={dataWithColor}
          />
        </FlexibleXYPlot>
      </div>
    )
  }
}

export default Canvas
