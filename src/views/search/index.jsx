import React, { Component } from 'react';
import './style.scss';

class Search extends Component {
  render() {
    return(
      <div className="search">
        <div className="search-input">
          <div className="input">
            <input type="text" placeholder="最强神话"/>
          </div>
          <div className="btn">取消</div>
        </div>
        <div className="search-hot">
          <div className="title">
            <div className="left">搜索热词</div>
            <div className="right">
              <span className="more">查看更多</span>
              <span className="iconfont iconarrowll-r"></span>
            </div>
          </div>
          <ul className="keyword">
            <li>系统</li>
            <li>系统</li>
            <li>系统</li>
            <li>系统</li>
            <li>系统</li>
            <li>系统</li>
            <li>系统</li>
          </ul>
        </div>
        <div className="search-rec">
          <div className="title">
            <div className="left">搜索推荐</div>
            <div className="right">
              <span className="more">换一批</span>
              <span className="iconfont iconarrowll-r"></span>
            </div>
          </div>
          <ul className="keyword">
            <li>
              <span className="iconfont iconshu"></span>
              <span>流浪地球</span>
            </li>
            <li>
              <span className="iconfont iconshu"></span>
              <span>流浪地球</span>
            </li>
            <li>
              <span className="iconfont iconshu"></span>
              <span>流浪地球</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Search;
