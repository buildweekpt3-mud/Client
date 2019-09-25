import { transform } from '@babel/core'

const styles = ({ spacing, breakpoints, palette }) => ({
  game: {
    position: 'relative',
    background: 'black',
    width: 1000
  },
  background: {
    width: '100%'
  },
  top: {
    position: 'absolute',
    top: 0,
    right: '50%',
    width: 140,
    transform: 'translate(50%, 0)',
    cursor: 'pointer'
  },
  bottom: {
    position: 'absolute',
    bottom: 4,
    right: '50%',
    width: 140,
    transform: 'translate(50%, 0)',
    cursor: 'pointer'
  },
  right: {
    position: 'absolute',
    right: 0,
    top: '50%',
    height: 140,
    transform: 'translate(0, -50%)',
    cursor: 'pointer'
  },
  left: {
    position: 'absolute',
    left: 0,
    top: '50%',
    height: 140,
    transform: 'translate(0, -50%)',
    cursor: 'pointer'
  }
})
export default styles
