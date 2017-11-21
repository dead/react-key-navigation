import Focusable from './Focusable.jsx';

class VerticalList extends Focusable {
  getNextFocus(direction, focusedIndex) {
    if (direction !== 'up' && direction !== 'down') {
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
      return nextFocus.getDefaultFocus();
    }

    return nextFocus;
  }
}

export default VerticalList;
