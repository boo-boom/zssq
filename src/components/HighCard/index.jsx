import React, { Component } from 'react'
import { formatImg } from '@assets/js/utils'
import './style.scss'

class HighCard extends Component {
  render() {
    const data = this.props.data;
    return (
      <div className="high-card">
        <div className="title">
          <div className="desc">
            {/* <span className="line-l"></span> */}
            <span className="name">{data.title}</span>
            {/* <span className="line-r"></span> */}
          </div>
          <div className="more">
            <span className="text">查看更多</span>
            <span className="iconfont iconarrowll-r"></span>
          </div>
        </div>
        {
          data.items.map(item => {
            return(
              <div className="main" key={item._id}>
                <div className="left">
                  <div className="top">
                    <p className="title line-clamp1">{item.title}</p>
                    <p className="tags">
                      {
                        item.tags.map(tag => {
                          return (<span key={tag}>{tag}</span>)
                        })
                      }
                    </p>
                    <p className="text line-clamp2">{item.desc}</p>
                  </div>
                  <p className="other">{item.bookCount}本 | {item.weekCollectorCount}收藏</p>
                </div>
                <div className="right">
                  <img src={formatImg(item.covers[0])} alt="" />
                  <img src={formatImg(item.covers[1])} alt="" />
                  <img src={formatImg(item.covers[2])} alt="" />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default HighCard;
