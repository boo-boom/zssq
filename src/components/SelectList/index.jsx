import React, { Component } from 'react'
import './style.scss'

class SelectList extends Component {
  render() {
    return (
      <div className="select-list show">
        <ul className="list">
          <li className="item cur">
            <span className="text">按综合</span>
            <span className="iconfont iconsure"></span>
          </li>
          <li className="item">
            <span className="text">按人气</span>
          </li>
          <li className="item">

            <span className="text">按留存</span>
          </li>
          <li className="item">
            <span className="text">按评分</span>
          </li>
          <li className="item">
            <span className="text">按字数</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default SelectList;
