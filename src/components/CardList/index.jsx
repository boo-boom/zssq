import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { formatNumUnit } from '@assets/js/utils'
import './style.scss'

class CartList extends Component {
  creat_1_4() {
    const books = this.props.data.books;
    const book_4 = books.slice(1, 5);
    return(
      <div className="cart-1-4">
        <div className="item-1">
          <div className="cover">
            <img src={books[0].cover} alt="" />
          </div>
          <div className="info">
            <div className="top">
              <p className="name">{books[0].title}</p>
              <p className="desc line-clamp2">{books[0].shortIntro}</p>
            </div>
            <div className="other">
              <p className="author">
                <span className="iconfont iconuser"></span>
                <span className="name">{books[0].author}</span>
              </p>
              <p className="tags">
                <span>{books[0].majorCate}</span>
                <span>{formatNumUnit(books[0].wordCount)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="item-4">
          {
            book_4.map(item => {
              return (
                <div className="child" key={item.title}>
                  <div className="cover">
                    <img src={item.cover} alt="" />
                  </div>
                  <p className="name">{item.title}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
  creat_1_1 () {
    const books = this.props.data.books.slice(0, 10);
    return (
      <div className="cart-1-1">
        {
          books.map(item => {
            return (
              <div className="item-1" key={item._id}>
                <div className="cover">
                  <img src={item.cover} alt="" />
                </div>
                <div className="info">
                  <div className="top">
                    <p className="name">{item.title}</p>
                    <p className="desc line-clamp2">{item.shortIntro}</p>
                  </div>
                  <div className="other">
                    <p className="author">
                      <span className="iconfont iconuser"></span>
                      <span className="name">{item.author}</span>
                    </p>
                    <p className="tags">
                      <span>{item.majorCate}</span>
                      <span>{formatNumUnit(item.wordCount)}</span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
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
    const data = this.props.data;
    return (
      <div className="cart-list">
        <div className="title">
          <div className="desc">{data.title}</div>
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

CartList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
}

export default CartList;
