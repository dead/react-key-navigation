import React from 'react'

class Focusable extends React.Component {
  render () {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default Focusable
