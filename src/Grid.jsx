import React from 'react';
import Focusable from './Focusable.jsx';
import HorizontalList from './HorizontalList.jsx';

class Grid extends Focusable {
  isContainer() {
    return true;
  }
  
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

    if (!nextFocus.isContainer()) {
      return null;
    }

    const currentPath = this.context.navigationComponent.currentFocusedPath;

    const row = nextFocus.indexInParent;
    let column = currentPath[currentPath.indexOf(this) + 2].indexInParent;

    if (this.children[row].children.length <= column) {
      column = this.children[row].children.length;
    }

    const next = this.children[row].children[column];
    if (next.isContainer()) {
      if (next.hasChildren()) {
        return next.getDefaultFocus();
      }
      else {
        return this.getNextFocus(direction, nextFocus.indexInParent);
      }
    }

    return next;
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
