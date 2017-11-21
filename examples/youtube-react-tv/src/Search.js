import React from 'react';
import ReactTV from 'react-tv';

import { Focusable } from 'react-key-navigation'

export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      active: false
    };
  }

  onBlur() {
    this.setState({active: false});
  }

  onFocus() {
    this.setState({active: true});
  }

  render() {
    return (
      <Focusable onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} navDefault>
        <div class={this.state.active ? 'search-box-placeholder-focus' : ''} id="search-box-placeholder"><i class="fa fa-search"></i></div>
      </Focusable>
    );
  }
}
