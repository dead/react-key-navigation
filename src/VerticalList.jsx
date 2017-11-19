import NavigableList from './NavigableList.jsx';

class VerticalList extends NavigableList {
  getNextFocus(direction) {
    if (direction !== 'up' && direction !== 'down') {
      return super.getNextFocus(direction);
    }

    let elemIndex = null;
    if (direction === 'up') {
      elemIndex = this.previousChild();
    } else if (direction === 'down') {
      elemIndex = this.nextChild();
    }

    if (elemIndex === null) {
      return super.getNextFocus(direction);
    }

    if (this._children[elemIndex].isContainer()) {
      return this._children[elemIndex].getLeaf();
    }

    return {
      parent: this,
      elementIndex: elemIndex,
      element: this._children[elemIndex],
    }
  }
}

export default VerticalList;
