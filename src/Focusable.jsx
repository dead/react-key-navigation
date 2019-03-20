import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Focusable extends Component {
  treePath = [];
  children = [];
  indexInParent = 0;
  focusableId = null;
  lastFocusChild = null;

  constructor(props, context) {
    super(props, context);
  }

  isContainer() {
    return this.children.length > 0;
  }

  getParent() {
    return this.context.parentFocusable;
  }

  addChild(child) {
    this.children.push(child);
    return this.children.length - 1;
  }

  removeChild(child) {
    this.context.navigationComponent.removeFocusableId(child.focusableId);
    this.children.splice(child.indexInParent, 1);

    for (let i = child.indexInParent; i < this.children.length; ++i) {
      this.children[i].indexInParent -= 1;
    }

    const currentFocusedPath = this.context.navigationComponent.currentFocusedPath;
    const index = currentFocusedPath.indexOf(child);

    if (index >= 0) {
      const next = currentFocusedPath[index - 1].getDefaultFocus();
      this.context.navigationComponent.focus(next);
    }
  }

  getDefaultChild() {
    if (this.lastFocusChild && this.props.retainLastFocus) {
      return this.lastFocusChild;
    }

    return 0;
  }

  getNextFocusFrom(direction) {
    return this.getNextFocus(direction, this.indexInParent);
  }

  getNextFocus(direction, focusedIndex) {
    if (!this.getParent()) {
      return null;
    }

    return this.getParent().getNextFocus(direction, focusedIndex);
  }

  getDefaultFocus() {
    if (this.isContainer())
      return this.children[this.getDefaultChild()].getDefaultFocus();

    return this;
  }

  buildTreePath() {
    this.treePath.unshift(this);

    let parent = this.getParent();
    while (parent) {
      this.treePath.unshift(parent);
      parent = parent.getParent();
    }
  }

  focus() {
    this.treePath.map(component => {
      if (component.props.onFocus)
        component.props.onFocus(this.indexInParent, this.context.navigationComponent);
    });
  }

  blur() {
    if (this.props.onBlur) {
      this.props.onBlur(this.indexInParent, this.context.navigationComponent);
    }
  }

  nextChild(focusedIndex) {
    if (this.children.length === focusedIndex + 1) {
      return null;
    }

    return this.children[focusedIndex + 1];
  }

  previousChild(focusedIndex) {
    if (focusedIndex - 1 < 0) {
      return null;
    }

    return this.children[focusedIndex - 1];
  }

  getNavigator() {
    return this.context.navigationComponent;
  }

  // React Methods
  getChildContext() {
    return { parentFocusable: this };
  }

  componentDidMount() {
    if (this.context.parentFocusable) {
      this.buildTreePath();
      this.indexInParent = this.getParent().addChild(this);
    }

    if (this.props.navDefault) {
      this.context.navigationComponent.setDefault(this);
    }

    if (this.props.forceFocus) {
      this.context.navigationComponent.focus(this);
    }

    this.focusableId = this.context.navigationComponent.addComponent(this, this.props.focusId);
  }

  componentWillUnmount() {
    if (this.context.parentFocusable) {
      this.getParent().removeChild(this);
    }
  }

  shouldComponentUpdate() {
    if (this.children.length > 0) {
      for(let child of this.children) {
        child.indexInParent = -1;
      }

      this.children = [];
    }

    return true;
  }

  componentDidUpdate() {
    if (this.context.parentFocusable && this.indexInParent === -1) {
      this.indexInParent = this.getParent().addChild(this);
    }
  }

  render() {
    const { focusId, navDefault, onFocus, onBlur, onEnterDown, ...props } = this.props;
    return <span {...props} />
  }
}

Focusable.contextTypes = {
  parentFocusable: PropTypes.object,
  navigationComponent: PropTypes.object,
};

Focusable.childContextTypes = {
  parentFocusable: PropTypes.object,
};

Focusable.defaultProps = {
  rootNode: false,
  navDefault: false,
  forceFocus: false,
  retainLastFocus: false,
  onFocus: PropTypes.function,
  onBlur: PropTypes.function,
  onEnterDown: PropTypes.function
};

export default Focusable;
