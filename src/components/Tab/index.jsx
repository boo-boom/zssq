import React, { Component } from 'react';
import './style.scss';

class Tab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curIndex: 0,
      showModel: false,
    }
  }
  changeTab(index) {
    this.setState({
      curIndex: index
    })
    this.props.curIndex(index)
  }
  render() {
    return (
      <div className="tab">
        <ul>
          {
            this.props.data.map((item, index) => {
              return (
                <li
                  className={`${this.state.curIndex === index ? 'active' : ''}`}
                  key={item.id}
                  onClick={this.changeTab.bind(this, index)}>
                  {item.title}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Tab;
