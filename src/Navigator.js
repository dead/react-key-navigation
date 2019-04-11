const reverseDirection = {
  'up': 'down',
  'down': 'up',
  'left': 'right',
  'right': 'left'
}

const isMovement = (action) => ['up', 'down', 'left', 'right'].includes(action)

class Navigator {
  constructor (keyMapping) {
    this.keyMapping = keyMapping || {
      '37': 'left',
      '38': 'up',
      '39': 'right',
      '40': 'down',
      '13': 'enter'
    }

    this.currentFocused = null
    window.addEventListener('keydown', this.onKeyDown.bind(this))
  }

  onKeyDown (event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return
    }

    // const preventDefault = () => {
    //   event.preventDefault()
    //   event.stopPropagation()
    //   return false
    // }

    const action = this.keyMapping[event.keyCode]

    if (!action) {
      return
    }

    if (isMovement(action)) {

    } else {
      // fireEvent(action)
    }
  }
}

export default Navigator
