import React, { Component } from 'react'
import './style.scss'

class CartList extends Component {
  creat_1_4() {
    return(
      <div className="cart-1-4">
        <div className="item-1">
          <div className="cover">
            <img src="http://dummyimage.com/150x200" alt="" />
          </div>
          <div className="info">
            <div className="top">
              <p className="name">天下攻略</p>
              <p className="desc">天下攻略天下攻略天下攻略天下攻略天下攻略天下攻略</p>
            </div>
            <div className="other">
              <p className="author">
                <span className="iconfont iconuser"></span>
                <span className="name">田下</span>
              </p>
              <p className="tags">
                <span>古代</span>
                <span>20万字</span>
              </p>
            </div>
          </div>
        </div>
        <div className="item-4">
          <div className="child">
            <div className="cover">
              <img src="http://dummyimage.com/150x200" alt="" />
            </div>
            <p className="name">天下攻略</p>
          </div>
          <div className="child">
            <div className="cover">
              <img src="http://dummyimage.com/150x200" alt="" />
            </div>
            <p className="name">天下攻略</p>
          </div>
          <div className="child">
            <div className="cover">
              <img src="http://dummyimage.com/150x200" alt="" />
            </div>
            <p className="name">天下攻略</p>
          </div>
          <div className="child">
            <div className="cover">
              <img src="http://dummyimage.com/150x200" alt="" />
            </div>
            <p className="name">天下攻略</p>
          </div>
        </div>
      </div>
    )
  }
  creat_1_1 () {
    return (
      <div className="cart-1-1">
        <div className="item-1">
          <div className="cover">
            <img src="http://dummyimage.com/150x200" alt="" />
          </div>
          <div className="info">
            <div className="top">
              <p className="name">天下攻略</p>
              <p className="desc">天下攻略天下攻略天下攻略天下攻略天下攻略天下攻略</p>
            </div>
            <div className="other">
              <p className="author">
                <span className="iconfont iconuser"></span>
                <span className="name">田下</span>
              </p>
              <p className="tags">
                <span>古代</span>
                <span>20万字</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  createRender() {
    switch(this.props.type) {
      case '1-1':
        return this.creat_1_1();
      case '1-4':
        return this.creat_1_4();
      default:
        return null;
    }
  }
  render () {
    return (
      <div className="cart-list">
        <div className="title">
          <div className="desc">和你口味的书友们都在看</div>
          <div className="more">
            <span className="text">查看更多</span>
            <span className="iconfont iconarrowll-r"></span>
          </div>
        </div>
        {this.createRender()}
      </div>
    )
  }
}

export default CartList;
