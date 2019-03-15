import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './style.scss'

class CartBox extends Component {
  render () {
    const title = this.props.title;
    return (
      <div className="cart-box">
        <div className="title">
          <div className="desc">{title}</div>
          <div className="more">
            <span className="text">查看更多</span>
            <span className="iconfont iconarrowll-r"></span>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

CartBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object.isRequired,
}

export default CartBox;
