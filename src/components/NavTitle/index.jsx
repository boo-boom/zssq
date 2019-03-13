import React, { Component } from 'react';
import './style.scss';

class NavTitle extends Component {
  render() {
    return (
      <div className="nav-title">
        <div className="left">
          <div className="iconfont iconfanhui"></div>
          <div className="text">返回</div>
        </div>
        <div className="title">
          {this.props.title}
        </div>
        <div className="right"></div>
      </div>
    )
  }
}

export default NavTitle;

