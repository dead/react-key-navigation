import React from 'react'
import { FocusableContext, NavigationContext } from './Contexts'

class FocusableContainer extends React.Component {
  renderChildren () {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        index: index
      })
    })
  }

  render () {
    return (
      <FocusableContext.Provider value={this}>
        {this.renderChildren()}
      </FocusableContext.Provider>
    )
  }
}

export default (props) => (
  <NavigationContext.Consumer>
    {navigator => (
      <FocusableContext.Consumer>
        {parent => (
          <FocusableContainer {...props} navigator={navigator} parent={parent} />
        )}
      </FocusableContext.Consumer>)}
  </NavigationContext.Consumer>
)
