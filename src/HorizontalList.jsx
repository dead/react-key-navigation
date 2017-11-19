import NavigableList from './NavigableList.jsx';

class HorizontalList extends NavigableList {
  getNextFocus(direction) {
    if (direction !== 'left' && direction !== 'right') {
      return super.getNextFocus(direction);
    }

    let elemIndex = null;
    if (direction === 'left') {
      elemIndex = this.previousChild();
    } else if (direction === 'right') {
      elemIndex = this.nextChild();
    }

    if (elemIndex === null) {
      return super.getNextFocus(direction);
    }

    if (this._children[elemIndex].isContainer()) {
      return this._children[elemIndex].getNextFocus(direction);
    }

    return {
      parent: this,
      elementIndex: elemIndex,
      element: this._children[elemIndex],
    }
  }
}

export default HorizontalList;
