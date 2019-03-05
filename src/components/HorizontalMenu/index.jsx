import React, { Component } from 'react';
import './style.scss';

class HorizontalMenu extends Component {
  render() {
    return (
      <div className="horizontal-menu">
        <ul>
          <li className="active">读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
          <li>读书</li>
        </ul>
        <span className="iconfont iconmore"></span>
      </div>
    )
  }
}

export default HorizontalMenu;
