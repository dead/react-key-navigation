import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Focusable extends Component {
  constructor(props, context) {
    super(props, context);

    if (!this.context.parentList) {
      throw new Error('You need a container (Vertical or Horizontal List)');
    }

    this._parent = this.context.parentList;
    this._mainComponent = this.context.navigationComponent;
    this._addToParent();
  }

  _addToParent() {
    this._parent.addChild(this);
  }

  getParentContainer() {
    return this._parent;
  }

  isContainer() {
    return false;
  }

  // React Methods
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}

Focusable.contextTypes = {
  parentList: PropTypes.object,
  navigationComponent: PropTypes.object,
};

Focusable.defaultProps = {

}

export default Focusable;
