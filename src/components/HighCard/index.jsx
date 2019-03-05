import React, { Component } from 'react'
import './style.scss'

class HighCard extends Component {
  render() {
    return (
      <div className="high-card">
        <div className="title">
          <div className="desc">
            <span className="line-l"></span>
            <span className="name">精品书单</span>
            <span className="line-r"></span>
          </div>
          <div className="more">
            <span className="text">查看更多</span>
            <span className="iconfont iconarrowll-r"></span>
          </div>
        </div>
        <div className="main">
          <div className="left">
            <div className="top">
              <p className="title">这么好看的你不收藏吗</p>
              <p className="tags">
                <span>认证单主</span>
                <span>走心粮草库</span>
                <span>编辑推荐</span>
              </p>
              <p className="text">这么好看的你不收藏吗这么好看的你不收藏吗你不收藏吗</p>
            </div>
            <p className="other">166本 | 232收藏</p>
          </div>
          <div className="right">
            <img src="http://dummyimage.com/230x160" alt="" />
          </div>
        </div>
        <div className="main">
          <div className="left">
            <div className="top">
              <p className="title">这么好看的你不收藏吗</p>
              <p className="tags">
                <span>认证单主</span>
                <span>走心粮草库</span>
                <span>编辑推荐</span>
              </p>
              <p className="text">这么好看的你不收藏吗这么好看的你不收藏吗你不收藏吗</p>
            </div>
            <p className="other">166本 | 232收藏</p>
          </div>
          <div className="right">
            <img src="http://dummyimage.com/230x160" alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default HighCard;
