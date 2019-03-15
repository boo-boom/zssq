import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { debounce } from '@assets/js/utils';
import {
  getSearchAll,
  getSearchSuggest,
  setCleanSuggest,
  getSearchResult,
  setCleanResult,
  getBooksOther,
  setShowSearchResult,
 } from './reducer';
import Loading from '@components/Loading';
import Tab from '@components/Tab';
import BookList from '@components/BookList';
// import SelectList from '@components/SelectList';
import './style.scss';

@connect(
  state => ({search: state.search}),
  {
    getSearchAll,
    getSearchSuggest,
    setCleanSuggest,
    getSearchResult,
    setCleanResult,
    getBooksOther,
    setShowSearchResult,
  }
)
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      searchHistory: [],
      tabs: [
        {id: 1, title: '书籍', type: 1},
        {id: 2, title: '漫画', type: 2},
        {id: 3, title: '书单'},
        {id: 4, title: '社区'}
      ],
      tabCurIndex: 0,
    }
    this.changeSearch = this.changeSearch.bind(this);
    this.goIndex = this.goIndex.bind(this);
    this.cleanInput = this.cleanInput.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.cleanLocal = this.cleanLocal.bind(this);
    this.handleGetTabIndex = this.handleGetTabIndex.bind(this);
  }
  componentWillMount() {
    // 搜索框防抖
    this.debounce = debounce(() => {
      // 只要value改变则隐藏搜索结果列表
      this.props.setShowSearchResult(false)
      // 清空搜素结果
      this.props.setCleanResult()
      if(this.state.searchValue) {
        this.props.getSearchSuggest(this.state.searchValue)
      } else {
        // 清空联想词列表
        this.props.setCleanSuggest()
      }
    }, 300)
    this.props.getSearchAll();
    this.setState({
      searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || []
    })
  }
  // 搜索框
  changeSearch(e) {
    this.setState({
      searchValue: e.target.value
    }, this.debounce())
    // 必须先声明之后调用，否则timer一直为null
  }
  // 清空input
  cleanInput() {
    this.setState({
      searchValue: ''
    }, () => {
      // 清空联想词列表
      this.props.setCleanSuggest()
      // 清空搜素结果
      this.props.setCleanResult()
      // 隐藏搜索结果列表
      this.props.setShowSearchResult(false)
    })
  }
  // 历史记录
  searchSubmit(e) {
    const value = this.refs.searchInput.value;
    const searchHistory = this.state.searchHistory;
    if(value) {
      if(searchHistory.indexOf(value) !== -1) {
        searchHistory.splice(searchHistory.indexOf(value), 1);
      }
      if(searchHistory.length >= 5) {
        searchHistory.splice(searchHistory.length-1, 1);
      }
      searchHistory.unshift(value);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
      this.setState(searchHistory);
    }
    e.preventDefault();
  }
  // 清空历史
  cleanLocal() {
    this.setState({
      searchHistory: ''
    })
    localStorage.removeItem('searchHistory')
  }
  // 跳转首页
  goIndex() {
    // 清空联想词列表
    this.props.setCleanSuggest()
    // 清空搜素结果
    this.props.setCleanResult()
    this.props.history.push('/home');
  }
  // 获取tab的索引
  handleGetTabIndex(index) {
    this.setState({
      tabCurIndex: index
    })
    const state = this.state;
    if(state.tabs[index].type === 1 || state.tabs[index].type === 2) {
      this.props.setCleanResult()
      this.props.getSearchResult(state.searchValue, state.tabs[index].type);
    }
  }
  // 获取搜索结果
  getResult(keyword) {
    this.props.getSearchResult(keyword, this.state.tabs[0].type);
    this.props.getBooksOther(keyword);
    // 清空联想词列表
    this.props.setCleanSuggest()
    this.setState({
      searchValue: keyword
    })
  }
  // 创建搜索结果dom
  creatResultContent() {
    const search = this.props.search;
    const searchResult = search.searchResult;   // 搜索结果
    const bookSuggest = search.bookSuggest;   // 搜索结果书籍建议
    return (
      <div className="result-content">
        <Tab data={this.state.tabs} curIndex={this.handleGetTabIndex}/>
        {
          this.state.tabs[this.state.tabCurIndex].id===1 ?
          <Fragment>
            <div className="btns">
              <div className="btn cur">
                <span className="text">按综合</span>
                <span className="iconfont iconarrowll-t"></span>
              </div>
              <div className="btn">
                <span className="text">筛选</span>
                <span className="iconfont iconarrowll-b"></span>
              </div>
            </div>
            {/* <SelectList/> */}
            <div className="result-list">
              {
                bookSuggest.map((item, index) => {
                  if(index < 3) {
                    return (
                      <div className="type" key={`${item.text}_${index}`}>
                        <span className={`iconfont
                          ${
                            item.tag==='bookauthor'?
                            'iconuserline':
                            item.tag==='cat'?
                            'iconfenlei':
                            item.tag==='tag'?
                            'iconshuqian':
                            'iconshuqianline'
                          }`}></span>
                        <span className="title">{item.text}</span>
                        {item.tag === "bookauthor" ? <span className="tag">作者</span> : null}
                        {item.tag === "cat" ? <span className="tag">分类</span> : null}
                        {item.tag === "tag" ? <span className="tag">标签</span> : null}
                        {item.gender === "male" ? <span className="tag">男频</span> : null}
                        {item.gender === "female" ? <span className="tag">女频</span> : null}
                      </div>
                    )
                  } else {
                    return null
                  }
                })
              }
            </div>
          </Fragment> :
          null
        }
        {<BookList type={'1-1'} data={searchResult}/>}
      </div>
    )
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
              <form action="" onSubmit={this.searchSubmit}>
                <input
                  ref="searchInput"
                  type="search"
                  maxLength="30"
                  placeholder={searchRecommend.title}
                  value={this.state.searchValue}
                  onChange={this.changeSearch}/>
              </form>
              {this.state.searchValue ? <span className="iconfont iconshanchu" onClick={this.cleanInput}></span> : null}
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
                  return (<li key={item.word} onClick={this.getResult.bind(this,item.word)}>{item.word}</li>)
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
                      <span className="line-clamp1">{item.word}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {
            this.state.searchHistory.length ?
            <div className="search-history">
              <div className="title">
                <div className="left">搜索历史</div>
                <div className="right" onClick={this.cleanLocal}>
                  <span className="more">删除历史</span>
                  <span className="iconfont icondel"></span>
                </div>
              </div>
              <ul className="keyword">
                {
                  this.state.searchHistory.map((item,index) => {
                    return (
                      <li key={`${item}_${index}`}>
                        <span className="iconfont iconshijian"></span>
                        <span>{item}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div> :
            null
          }
          {/* 联想词结果 */}
          <div className={`keyword-list ${showList || 'hide'}`}>
            <ul>
              {
                searchSuggest.length && searchSuggest.map(item => {
                  let creatItems = [];
                    creatItems.push(
                      <li className="item" key={`${item.url}`} onClick={this.getResult.bind(this,item.text)}>
                        <span className={`iconfont
                          ${
                            item.tag==='bookauthor'?
                            'iconuserline':
                            item.tag==='cat'?
                            'iconfenlei':
                            item.tag==='tag'?
                            'iconshuqian':
                            'iconshuqianline'
                          }`}></span>
                        <span className="name">
                          {item.text}
                          {item.tag === "bookauthor" ? <small>作者</small> : null}
                          {item.tag === "cat" ? <small>分类</small> : null}
                          {item.tag === "tag" ? <small>标签</small> : null}
                          {item.gender === "male" ? <small>男频</small> : null}
                          {item.gender === "female" ? <small>女频</small> : null}
                        </span>
                      </li>
                    )
                  return (creatItems)
                })
              }
            </ul>
          </div>
          {/* 搜索结果 */}
          {this.props.search.showSearchResult ? this.creatResultContent() : null}
        </div>
      : <Loading/>
    )
  }
}

export default Search;
