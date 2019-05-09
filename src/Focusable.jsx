import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Focusable extends Component {
  treePath = [];
  children = [];
  indexInParent = 0;
  focusableId = null;
  lastFocusChild = null;
  updateChildrenOrder = false;
  updateChildrenOrderNum = 0;

  state = {
    focusTo: null
  }

  constructor(props, context) {
    super(props, context);
  }

  isContainer() {
    return false;
  }
  
  hasChildren() {
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

    const currentFocusedPath = this.context.navigationComponent.currentFocusedPath;
    if(!currentFocusedPath){
      return
    }
    const index = currentFocusedPath.indexOf(child);

    if (index > 0) {
      this.setState({ focusTo: currentFocusedPath[index - 1] })
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
    if (this.isContainer()) {
      if (this.hasChildren()) {
        return this.children[this.getDefaultChild()].getDefaultFocus();
      }
      
      return null;
    }

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
    this.focusableId = this.context.navigationComponent.addComponent(this, this.props.focusId);
    
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
  }

  componentWillUnmount() {
    if (this.context.parentFocusable) {
      this.getParent().removeChild(this);
    }
    
    this.focusableId = null;
  }

  componentDidUpdate() {
    const parent = this.getParent();
    if (parent && parent.updateChildrenOrder) {
      if (parent.updateChildrenOrderNum === 0) {
        parent.children = [];
      }

      parent.updateChildrenOrderNum++;
      this.indexInParent = parent.addChild(this);
    }

    if (this.state.focusTo !== null) {
      this.context.navigationComponent.focus(this.state.focusTo.getDefaultFocus());
      this.setState({ focusTo: null });
    }
    
    this.updateChildrenOrder = false;
  }

  render() {
    const { focusId, rootNode, navDefault, forceFocus, retainLastFocus, onFocus, onBlur, onEnterDown, ...props } = this.props;

    if (this.children.length > 0) {
      this.updateChildrenOrder = true;
      this.updateChildrenOrderNum = 0;
    }

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
