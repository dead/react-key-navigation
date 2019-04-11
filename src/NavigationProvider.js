import React from 'react'
import Navigator from './Navigator'
import { NavigationContext } from './Contexts'

class NavigationProvider extends React.Component {
  navigator = new Navigator(this.props.keyMapping)

  render () {
    return (
      <NavigationContext.Provider value={this.navigator}>
        {this.props.children}
      </NavigationContext.Provider>
    )
  }
}

export default NavigationProvider
