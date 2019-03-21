import React, { Component } from 'react'
import './style.scss'

class SelectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curIndex: this.props.curindex,
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
            this.props.list.map((item,index) => {
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
