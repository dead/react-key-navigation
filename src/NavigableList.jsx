import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NavigableList extends Component {
  _focusedChild = null;
  _parentIndex = 0;
  _children = [];
  _parent = null;
  _mainComponent = null;

  constructor(props, context) {
    super(props, context);

    this._parent = this.context.parentList;
    this._mainComponent = this.context.navigationComponent;

    this._mainComponent.register(this);

    if (this.props.navDefault) {
      this._mainComponent.setDefault(this);
    }

    this._addToParent();
  }

  _addToParent() {
    if (this._parent) {
      this._parentIndex = this._parent.addChild(this);
    }
  }

  _getDefaultChild() {
    return 0;
  }

  _focus(childIndex) {
    this._focusedChild = childIndex;
    this._updateParentFocus();
  }

  _updateParentFocus() {
    if (!this._parent)
      return;

    if (this._parent.getFocusedIndex() !== this._parentIndex) {
      this._parent._focus(this._parentIndex);
    }
  }

  getFocusedIndex() {
    return this._focusedChild;
  }

  addChild(component) {
    this._children.push(component);
    return this._children.length - 1;
  }

  getNextFocus(direction) {
    if (this._parent)
      return this._parent.getNextFocus(direction);
    return null;
  }

  nextChild() {
    if (this._focusedChild === null)
      return this._getDefaultChild();

    if (this._children.length === this._focusedChild + 1) {
      return null;
    }

    return this._focusedChild + 1;
  }

  previousChild() {
    if (this._focusedChild === null)
      return this._getDefaultChild();

    if (this._focusedChild - 1 < 0) {
      return null;
    }

    return this._focusedChild - 1;
  }

  isContainer() {
    return true;
  }

  getLeaf() {
    if (this._childrens.length === 0)
      return null;

    const child = this._children[this._getDefaultChild()];
    if (child.isContainer())
      return child.getLeaf();

    return {
      parent: this,
      elementIndex: this._getDefaultChild(),
      element: child,
    };
  }

  // React Methods
  getChildContext() {
    return {parentList: this};
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

NavigableList.contextTypes = {
  parentList: PropTypes.object,
  navigationComponent: PropTypes.object,
};

NavigableList.childContextTypes = {
  parentList: PropTypes.object
};

export default NavigableList;
