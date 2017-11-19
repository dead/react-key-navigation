# react-key-navigation
Similar to the "[Focus Management](http://bbc.github.io/tal/widgets/focus-management.html)" of the [BBC TAL](http://bbc.github.io/tal/).

## WIP
- [x] Focusable Component
  - [x] onFocus
  - [x] onBlur
  - [x] onEnterDown
- [x] Grid
- [x] Horizontal List
- [x] Vertical List
- [ ] Horizontal List Scrollable
- [ ] Vertical List Scrollable
- [ ] Use Higher-Order Components?
- [ ] Tests
- [ ] Examples
- [ ] Documentation

## Example
```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation, {VerticalList, HorizontalList, Grid, Focusable} from 'react-key-navigation';

class App extends Component {
  render() {
    return (
      <Navigation>
        <Grid rows={100} columns={100}>
          {Array.from(Array(10000).keys()).map((v, i) => {
            return (
              <Focusable key={i} onFocus={() => console.log('focus ' + i)} onBlur={() => console.log('blur ' + i)} onEnterDown={() => console.log('enter ' + i)}>
                Element {i}
              </Focusable>
            );
          })}
        </Grid>
      </Navigation>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
