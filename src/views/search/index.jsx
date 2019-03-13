import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from '@assets/js/utils';
import { getSearchAll, getSearchSuggest, setCleanSuggest } from './reducer';
import Loading from '@components/Loading';
import './style.scss';

@connect(
  state => ({search: state.search}),
  { getSearchAll, getSearchSuggest, setCleanSuggest }
)
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: ''
    }
    this.changeSearch = this.changeSearch.bind(this);
    this.goIndex = this.goIndex.bind(this);
  }
  componentWillMount() {
    this.debounce = debounce(() => {
      if(this.state.searchValue) {
        this.props.getSearchSuggest(this.state.searchValue)
      } else {
        this.props.setCleanSuggest()
      }
    }, 300)
    this.props.getSearchAll();
  }
  changeSearch(e) {
    this.setState({
      searchValue: e.target.value
    }, this.debounce())
  }
  cleanInput() {
    this.setState({
      searchValue: ''
    })
  }
  goIndex() {
    this.props.history.push('/home');
  }
  render() {
    const search = this.props.search;
    const loadEnd = search.loadEnd;   // 数据全部加载完
    const searchRecommend = search.searchRecommend;   // 搜索框内推荐文字
    const searchHotWords = search.searchHotWords;   // 搜索热词
    const hotRecommend = search.hotRecommend;   // 搜索推荐
    const searchSuggest = search.searchSuggest;   // 搜索联想
    const showList = searchSuggest.length ? true : false;   // 是否显示联想词列表
    return(
      loadEnd
      ? <div className="search">
          <div className="search-input">
            <div className="input">
              <input type="text" placeholder={searchRecommend.title} value={this.state.searchValue} onChange={this.changeSearch} />
              <span className="iconfont iconshanchu"></span>
            </div>
            <div className="btn" onClick={this.goIndex}>取消</div>
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
                  return (<li key={item.word}>{item.word}</li>)
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
          <div className={`keyword-list ${showList || 'hide'}`}>
            <ul>
              {
                searchSuggest.length && searchSuggest.map(item => {
                  let creatItems = [];
                  if(item.tag === "bookauthor") {
                    creatItems.push(
                      <li className="item author" key={`bookauthor_${item.url}`}>
                        <span className="iconfont iconuserline"></span>
                        <span className="name">{item.text}<small>作者</small></span>
                      </li>
                    )
                  } else if(item.tag === "bookname") {
                    creatItems.push(
                      <li className="item" key={`bookname_${item.url}`}>
                        <span className="iconfont iconshuqianline"></span>
                        <span className="name">{item.text}</span>
                      </li>
                    )
                  } else {
                    creatItems = null
                  }
                  return (creatItems)
                })
              }
            </ul>
          </div>
        </div>
      :  <Loading/>
    )
  }
}

export default Search;
