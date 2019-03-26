import Focusable from './Focusable.jsx';

class VerticalList extends Focusable {
  isContainer() {
    return true;
  }
  
  getNextFocus(direction, focusedIndex) {
    const remainInFocus = this.props.remainInFocus ? this.props.remainInFocus : false;

    if (direction !== 'up' && direction !== 'down') {
      if (remainInFocus)
        return null;
      return super.getNextFocus(direction, this.indexInParent);
    }

    let nextFocus = null;
    if (direction === 'up') {
      nextFocus = this.previousChild(focusedIndex);
    } else if (direction === 'down') {
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
}

export default VerticalList;
