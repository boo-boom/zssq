import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSearchAll } from './reducer';
import Loading from '@components/Loading';
import './style.scss';

@connect(
  state => ({search: state.search}),
  { getSearchAll }
)
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: ''
    }
    this.changeSearch = this.changeSearch.bind(this);
  }
  componentWillMount() {
    this.props.getSearchAll();
  }
  changeSearch(e) {
    this.setState({
      searchValue: e.target.value
    })
  }
  render() {
    const search = this.props.search;
    const loadEnd = search.loadEnd;   // 数据全部加载完
    const searchRecommend = search.searchRecommend;   // 搜索框内推荐文字
    const searchHotWords = search.searchHotWords;   // 搜索热词
    const hotRecommend = search.hotRecommend;   // 搜索推荐
    return(
      loadEnd
      ? <div className="search">
          <div className="search-input">
            <div className="input">
              <input type="text" placeholder={searchRecommend.title} value={this.state.searchValue} onChange={this.changeSearch} />
              <span className="iconfont iconshanchu"></span>
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
              {
                searchHotWords.map(item => {
                  return (<li key={item.times}>{item.word}</li>)
                })
              }
            </ul>
          </div>
          <div className="search-rec">
            <div className="title">
              <div className="left">搜索推荐</div>
              <div className="right">
                <span className="more">换一批</span>
                <span className="iconfont iconshuaxin"></span>
              </div>
            </div>
            <ul className="keyword">
              {
                hotRecommend.map(item => {
                  return (
                    <li key={item.book}>
                      <span className="iconfont iconshuqianline"></span>
                      <span>{item.word}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {/* 搜索结果 */}
          <div className="keyword-list hide">
            <ul>
              <li className="item author">
                <span className="iconfont iconuserline"></span>
                <span className="name">我吃西虹市<small>作者</small></span>
              </li>
              <li className="item">
                <span className="iconfont iconshuqianline"></span>
                <span className="name">牛逼闪闪</span>
              </li>
            </ul>
          </div>
        </div>
      :  <Loading/>
    )
  }
}

export default Search;
