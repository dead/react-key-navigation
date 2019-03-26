import React from 'react';
import Focusable from './Focusable.jsx';

class HorizontalList extends Focusable {
  isContainer() {
    return true;
  }

  getNextFocus(direction, focusedIndex) {
    const remainInFocus = this.props.remainInFocus ? this.props.remainInFocus : false;

    if (direction !== 'left' && direction !== 'right') {
      if (remainInFocus)
        return null;
      return super.getNextFocus(direction, this.indexInParent);
    }

    let nextFocus = null;
    if (direction === 'left') {
      nextFocus = this.previousChild(focusedIndex);
    } else if (direction === 'right') {
      nextFocus = this.nextChild(focusedIndex);
    }

    if (!nextFocus) {
      return super.getNextFocus(direction, this.indexInParent);
    }

    if (nextFocus.isContainer()) {
      if (nextFocus.hasChildren()) {
        return nextFocus.getDefaultFocus();
      }
      else {
        return this.getNextFocus(direction, nextFocus.indexInParent);
      }
    }

    return nextFocus;
  }

  render() {
    const { focusId, rootNode, navDefault, forceFocus, retainLastFocus, onFocus, onBlur, onEnterDown, ...props } = this.props;
    return <div {...props} />
  }
}

export default HorizontalList;
