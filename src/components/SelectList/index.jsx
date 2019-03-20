import React, { Component } from 'react'
import './style.scss'

class SelectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {id: 1, name: '按综合'},
        {id: 2, name: '按人气'},
        {id: 3, name: '按留存'},
        {id: 4, name: '按评分'},
        {id: 5, name: '按字数'},
      ],
      curIndex: 0,
    }
  }
  handleClick(index) {
    if(index === this.state.curIndex) return;
    this.setState({
      curIndex: index
    })
    this.props.handleClick(index)
  }
  render() {
    return (
      <div className={`select-list ${this.props.show ? 'show' : 'hide'}`}>
        <ul className="list">
          {
            this.state.list.map((item,index) => {
              return (
                <li className={`item ${index===this.state.curIndex?'cur':''}`} key={item.id} onClick={this.handleClick.bind(this,index)}>
                  <span className="text">{item.name}</span>
                  {index===this.state.curIndex ? <span className="iconfont iconsure"></span> : null}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default SelectList;
