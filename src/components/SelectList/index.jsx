import React, { Component } from 'react'
import './style.scss'

class SelectList extends Component {
  render() {
    return (
      <div className="select-list">
        <ul className="list">
          <li className="item">
            <span className="text">按综合</span>
            <span className="iconfont iconfenlei"></span>
          </li>
          <li className="item">
            <span className="text">按综合</span>
            <span className="iconfont iconfenlei"></span>
          </li>
          <li className="item">
            <span className="text">按综合</span>
            <span className="iconfont iconfenlei"></span>
          </li>
        </ul>
      </div>
    )
  }
}

export default SelectList;
