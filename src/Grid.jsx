import React from 'react';
import NavigableList from './NavigableList.jsx';
import HorizontalList from './HorizontalList.jsx';

class Grid extends NavigableList {
  getNextFocus(direction) {
    if (direction !== 'up' && direction !== 'down') {
      return super.getNextFocus(direction);
    }

    let elemIndex = null;
    if (direction === 'up') {
      elemIndex = this.previousChildren();
    } else if (direction === 'down') {
      elemIndex = this.nextChildren();
    }

    if (elemIndex === null) {
      return super.getNextFocus(direction);
    }

    if (!this._children[elemIndex].isContainer()) {
      return null;
    }

    const row = elemIndex;
    let column = this._focusedChild !== null ? this._children[this._focusedChild]._focusedChild : 0;

    if (row === null || column === null) {
      return null;
    }

    if (this._children[row]._children.length <= column) {
      column = this._children[row]._children.length;
    }

    const next = this._children[row]._children[column];
    if (next.isContainer()) {
      return next.getLeaf();
    }

    return {
      parent: this,
      elementIndex: column,
      element: next,
    };
  }

  render() {
    let grid = new Array(this.props.rows);
    for (let i = 0; i < this.props.rows; i++) {
      grid[i] = new Array(this.props.columns);
    }

    React.Children.map(this.props.children, (child, i) => {
      const row = Math.floor(i / this.props.columns);
      const column = i % this.props.columns;
      grid[row][column] = child;
    });

    return (
      <div>
        {grid.map((row, i) =>
          <HorizontalList key={i}>
            {row.map(column =>
              column
            )}
          </HorizontalList>
        )}
      </div>
    );
  }
}

Grid.defaultProps = {
  columns: 0,
  rows: 0
}

export default Grid;
