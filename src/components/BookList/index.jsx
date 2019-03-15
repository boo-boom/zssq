import React, { Component } from 'react'
import { formatImg, formatNumUnit } from '@assets/js/utils'
import './style.scss'

class BookList extends Component {
  creat_1_4() {
    const datas = this.props.data;
    const datas_4 = datas.slice(1, 5);
    return(
      <div className="cart-1-4">
        <div className="item-1">
          <div className="cover">
            <img src={datas[0].cover} alt="" />
          </div>
          <div className="info">
            <div className="top">
              <p className="name">{datas[0].title}</p>
              <p className="desc line-clamp2">{datas[0].shortIntro}</p>
            </div>
            <div className="other">
              <p className="author">
                <span className="iconfont iconuser"></span>
                <span className="name">{datas[0].author}</span>
              </p>
              <p className="tags">
                <span>{datas[0].majorCate}</span>
                <span>{formatNumUnit(datas[0].wordCount)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="item-4">
          {
            datas_4.map(item => {
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
    const datas = this.props.data;
    return (
      <div className="cart-1-1">
        {
          datas.map(item => {
            return (
              <div className="item-1" key={item._id}>
                <div className="cover">
                  <img src={formatImg(item.cover)} alt="" />
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
  render() {
    return (
      <div className="book-list">
        {this.createRender()}
      </div>
    )
  }
}

export default BookList
