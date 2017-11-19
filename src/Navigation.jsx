import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
This component listen the window keys events.
*/

class Navigation extends Component {
  _currentFocusedElement = null;
  _lastFocusedElement = null;
  _pause = false;
  _default = null;

  onKeyDown = (evt) => {
    if (this._pause || evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) {
      return;
    }

    const preventDefault = function() {
      evt.preventDefault();
      evt.stopPropagation();
      return false;
    };

    const direction = this.props.keyMapping[evt.keyCode];

    if (!direction) {
      if (evt.keyCode === this.props.keyMapping['enter']) {
        if (this._currentFocusedElement) {
          if (!this.fireEvent(this._currentFocusedElement, 'enter-down')) {
            return preventDefault();
          }
        }
      }
      return;
    }

    let currentFocusedElement = this._currentFocusedElement;

    if (!currentFocusedElement) {
      currentFocusedElement = this._lastFocusedElement;

      if (!currentFocusedElement) {
        this.focusDefault();
        return preventDefault();
      }
    }

    const willmoveProperties = {
      direction: direction,
      cause: 'keydown'
    };

    if (this.fireEvent(currentFocusedElement, 'willmove', willmoveProperties)) {
      this.focusNext(direction, currentFocusedElement);
    }

    return preventDefault();
  }

  onKeyUp = (evt) => {

  }

  fireEvent(element, evt, evtProps) {
    switch(evt) {
      case 'willmove':
        if (element.props.onWillMove)
          element.props.onWillMove(evtProps);
        break;
      case 'onfocus':
        if (element.props.onFocus)
          element.props.onFocus(evtProps);
        break;
      case 'onblur':
        if (element.props.onBlur)
          element.props.onBlur(evtProps);
        break;
      case 'enter-down':
        if (element.props.onEnterDown)
          element.props.onEnterDown(evtProps);
        break;
      default:
        return false;
    }

    return true;
  }

  focusNext(direction, element) {
    const next = element.getParentContainer().getNextFocus(direction);
    if (next) {
      this.focus(next);
    }
  }

  focusDefault() {
    if (!this._default)
      return;

    const elementObj = this._default.getLeaf();
    this.focus(elementObj);
  }

  focus(elementObj) {
    if (!elementObj)
      return;

    this.blurCurrent();
    const element = elementObj.element;
    element.getParentContainer()._focus(elementObj.elementIndex);
    this.fireEvent(element, 'onfocus');
    this._changeFocus(element);
  }

  blurCurrent() {
    if (this._currentFocusedElement === null)
      return;

    this.fireEvent(this._currentFocusedElement, 'onblur');
  }

  _changeFocus(to) {
    const last = this._currentFocusedElement;
    this._currentFocusedElement = to;
    this._lastFocusedElement = last;
  }

  setDefault(component) {
    this._default = component;
  }

  register(component) {
    if (this._default === null) {
      this.setDefault(component);
    }
  }

  // React Functions
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.focusDefault();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  getChildContext() {
    return {navigationComponent: this};
  }

  render () {
    return (
      <div>{this.props.children}</div>
    );
  }
}

Navigation.defaultProps = {
  keyMapping: {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down',
    'enter': 13
  }
};

Navigation.childContextTypes = {
  navigationComponent: PropTypes.object
};

export default Navigation;
