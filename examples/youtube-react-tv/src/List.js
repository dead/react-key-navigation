import React from 'react';
import ReactTV from 'react-tv';

import { Focusable, HorizontalList } from 'react-key-navigation';

class ToogleItem extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false
    }
  }

  render() {
    return (
      <Focusable onFocus={() => this.setState({active: true})}
                 onBlur={() => this.setState({active: false})}>
        <div class={'item ' + (this.state.active ? 'item-focus' : '')}></div>
      </Focusable>
    );
  }
};

export default class List extends React.Component {
  constructor() {
    super();
    this._lastFocus = null;
  }

  componentDidMount() {
    const width = (Math.floor(this.content.scrollWidth /  this.content.clientWidth ) * this.content.clientWidth) + this.content.clientWidth + 20;
    if (this.content.getElementsByClassName('hz-list')[0]) {
      this.content.getElementsByClassName('hz-list')[0].style.width = width + 'px';
    }
  }

  onFocus(index) {
    if (this._lastFocus === index) {
      return;
    }

    if (this.props.onFocus) {
      this.props.onFocus();
    }

    if (this.content) {
      const items = this.content.getElementsByClassName('item');
      const offsetWidth = items[0].offsetWidth + 20;
      this.content.scrollLeft = offsetWidth * index;
    }

    this._lastFocus = index;
  }

  render() {
    return (
      <div class={"contentgroup " + (this.props.visible ? '' : 'fading-out')}>
        <h1>{this.props.title}</h1>
        <div class="content" ref={(content) => { this.content = content}}>
          <HorizontalList class="hz-list"
                          style={{overflow: 'hidden', display: 'block'}}
                          onFocus={(index) => this.onFocus(index)}
                          onBlur={() => { this._lastFocus = null }}>
            <ToogleItem></ToogleItem>
            <ToogleItem></ToogleItem>
            <ToogleItem></ToogleItem>
            <ToogleItem></ToogleItem>
            <ToogleItem></ToogleItem>
            <ToogleItem></ToogleItem>
            <ToogleItem></ToogleItem>
            <ToogleItem></ToogleItem>
            <ToogleItem></ToogleItem>
          </HorizontalList>
        </div>
      </div>
    );
  }
}
