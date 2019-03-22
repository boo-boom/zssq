import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { debounce } from '@assets/js/utils';
import {
  getSearchAll,
  getSearchSuggest,
  setCleanSuggest,
  getSearchResult,
  setCleanResult,
  getBooksOther,
  setShowSearchResult,
  getCateTag,
} from './reducer';
import Loading from '@components/Loading';
import Tab from '@components/Tab';
import BookList from '@components/BookList';
import ScrollView from '@components/ScrollView';
import SelectList from '@components/SelectList';
import SearchFilter from '@components/SearchFilter';
import './style.scss';

@connect(
  state => ({ search: state.search }),
  {
    getSearchAll,
    getSearchSuggest,
    setCleanSuggest,
    getSearchResult,
    setCleanResult,
    getBooksOther,
    setShowSearchResult,
    getCateTag,
  }
)
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      searchHistory: [],
      tabs: [
        { id: 1, title: '书籍', type: 1 },
        { id: 2, title: '漫画', type: 2 },
        { id: 3, title: '书单' },
        { id: 4, title: '社区' }
      ],
      tabCurIndex: 0,
      start: 0,
      limit: 20,
      hasmore: true,
      sortList: [
        {id: 1, name: '按综合', type: 'cate'},
        {id: 2, name: '按人气', type: 'pop'},
        {id: 3, name: '按留存', type: 'ratio'},
        {id: 4, name: '按评分', type: 'score'},
        {id: 5, name: '按字数', type: 'text'},
      ],
      sortType: 'cate',
      curSortIndex: 0,
      showSort: false,
      showFilter: false,
      sortOrFilter: '',
      // 做多每项选择3个，用逗号分割拼接
      filterList: [
        {title: '分类', type: 'cate', isMult: true, list: []},
        {title: '标签', type: 'tag', isMult: true, list: []},
        {title: '状态', type: 'status', isMult: false, list: [
          {text: '连载', param: 'true', active: false},
          {text: '完结', param: 'false', active: false},
        ]},
        {title: '价格', type: 'price', isMult: false, list: [
          {text: 'VIP', param: '2', active: false},
          {text: '付费', param: '3', active: false},
        ]},
        {title: '字数', type: 'num', isMult: true, list: [
          {text: '20万字内', param: '1', active: false},
          {text: '20万-50万字', param: '2', active: false},
          {text: '50万-100万字', param: '3', active: false},
          {text: '100万-200万字', param: '4', active: false},
          {text: '200万字以上', param: '5', active: false},
        ]},
      ],
      checkFilter: {}
    }
    this.changeSearch = this.changeSearch.bind(this);
    this.goIndex = this.goIndex.bind(this);
    this.cleanInput = this.cleanInput.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.cleanLocal = this.cleanLocal.bind(this);
    this.handleGetTabIndex = this.handleGetTabIndex.bind(this);
    this.pullup = this.pullup.bind(this);
  }
  componentWillMount() {
    // 暂存筛选初始
    this._state = cloneDeep(this.state);
    // 搜索框防抖
    this.debounce = debounce(() => {
      // 只要value改变则隐藏搜索结果列表
      this.props.setShowSearchResult(false)
      // 清空搜素结果
      this.props.setCleanResult()
      this.setState({
        ...this._state
      })
      if (this.state.searchValue) {
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
  componentWillUnmount() {
    this.cleanAllState()
    this.setState({
      ...this._state
    })
    this._state = null
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
      this.cleanAllState()
    })
  }
  // 清空全部状态
  cleanAllState() {
    // 清空联想词列表
    this.props.setCleanSuggest()
    // 清空搜素结果
    this.props.setCleanResult()
    // 隐藏搜索结果列表
    this.props.setShowSearchResult(false)
    this.setState(this._state)
    console.log(this._state)
  }
  // 历史记录
  searchSubmit(e) {
    const value = this.refs.searchInput.value;
    const searchHistory = this.state.searchHistory;
    if (value) {
      if (searchHistory.indexOf(value) !== -1) {
        searchHistory.splice(searchHistory.indexOf(value), 1);
      }
      if (searchHistory.length >= 5) {
        searchHistory.splice(searchHistory.length - 1, 1);
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
    if(this.state.tabCurIndex === index) return;
    this.setState({
      tabCurIndex: index,
      start: 0
    })
    const state = this.state;
    if (state.tabs[index].type === 1 || state.tabs[index].type === 2) {
      this.props.setCleanResult()
      this.props.getSearchResult({
        keyword: state.searchValue,
        start: state.start,
        limit: state.limit,
        type: state.tabs[index].type
      }).then(res => {
        this.setState({
          hasmore: res.total > (this.state.start + this.state.limit) ? true : false
        })
      });
    }
  }
  // 获取搜索结果
  getResult(keyword) {
    this.props.getSearchResult({
      keyword,
      start: this.state.start,
      limit: this.state.limit,
      type: this.state.tabs[0].type
    });
    this.props.getBooksOther(keyword);
    // 清空联想词列表
    this.props.setCleanSuggest()
    this.setState({
      searchValue: keyword
    })
  }
  // 滚动加载
  pullup() {
    if(!this.state.hasmore) return;
    this.setState({
      start: this.state.start + this.state.limit,
    })
    const state = this.state;
    const filter = state.checkFilter;
    const data = {
      keyword: state.searchValue,
      start: state.start,
      limit: state.limit,
      type: state.tabs[state.tabCurIndex].type,
      sort: state.tabs[state.curSortIndex].id !== 1 ? state.tabs[state.curSortIndex].id : null,
      cat: filter.cate,
      tag: filter.tag,
      isserial: filter.status,
      price: filter.price,
      wordCount: filter.num
    }
    this.props.getSearchResult(data).then(res => {
      this.setState({
        hasmore: res.total > (this.state.start + this.state.limit) ? true : false
      })
    });
    console.log('到底了...')
  }
  // 排序/筛选
  handleSortFilter(type) {
    if(type === 'sort') {
      this.setState({
        showSort: !this.state.showSort,
        showFilter: false,
        sortOrFilter: type
      })
    } else {
      this.props.getCateTag([
        {
          query: this.state.searchValue,
          limit: 15,
          type: this.state.tabs[this.state.tabCurIndex].type
        }
      ]).then(res => {
        const filterList = this.state.filterList;
        filterList[0].list = res[0];
        filterList[1].list = res[1];
        this.setState({
          filterList
        })
      });
      this.setState({
        showFilter: !this.state.showFilter,
        showSort: false,
        sortOrFilter: type
      })
    }
  }
  // 排序
  handleSort(index) {
    this.setState({
      showSort: false,
      start: 0,
      sortType: this.state.sortList[index].type,
      curSortIndex: index,
    }, () => {
      const state = this.state;
      const filter = state.checkFilter;
      const data = {
        keyword: state.searchValue,
        start: state.start,
        limit: state.limit,
        type: state.tabs[state.tabCurIndex].type,
        sort: state.tabs[state.curSortIndex].id !== 1 ? state.tabs[state.curSortIndex].id : null,
        cat: filter.cate,
        tag: filter.tag,
        isserial: filter.status,
        price: filter.price,
        wordCount: filter.num
      }
      this.props.getSearchResult(data, true);
    })
  }
  // 筛选
  handleFilter(filter) {
    this.setState({
      showFilter: false,
      checkFilter: filter,
    })
    const state = this.state;
    const data = {
      keyword: state.searchValue,
      start: state.start,
      limit: state.limit,
      type: state.tabs[state.tabCurIndex].type,
      sort: state.tabs[state.curSortIndex].id !== 1 ? state.tabs[state.curSortIndex].id : null,
      cat: filter.cate,
      tag: filter.tag,
      isserial: filter.status,
      price: filter.price,
      wordCount: filter.num
    }
    this.props.getSearchResult(data, true);
  }
  // 创建搜索结果dom
  creatResultContent() {
    const tabId = this.state.tabs[this.state.tabCurIndex].id;
    const search = this.props.search;
    const searchResult = search.searchResult;   // 搜索结果
    const bookSuggest = search.bookSuggest;   // 搜索结果书籍建议
    const state = this.state;
    const sortOrFilter = state.sortOrFilter;
    const showSort = state.showSort;
    const showFilter = state.showFilter;
    const sortList = state.sortList;
    const sortType = state.sortType;
    const filterList = state.filterList;
    // console.log(filterList)
    return (
      <div className="result-content">
        <Tab data={this.state.tabs} curIndex={this.handleGetTabIndex} />
        {
          tabId === 1
          ? <div className="btns">
              <div className={`btn ${sortOrFilter==='sort'&&showSort?'cur':''}`} onClick={this.handleSortFilter.bind(this,'sort')}>
                <span className="text">按综合</span>
                <span className={`iconfont iconarrowll-${sortOrFilter==='sort'&&showSort?'b':'t'}`}></span>
              </div>
              <div className={`btn ${sortOrFilter==='filter'&&showFilter?'cur':''}`} onClick={this.handleSortFilter.bind(this,'filter')}>
                <span className="text">筛选</span>
                <span className={`iconfont iconarrowll-${sortOrFilter==='filter'&&showFilter?'b':'t'}`}></span>
              </div>
            </div>
          : null
        }
        {
          tabId === 1 ?
          <Fragment>
            {sortOrFilter === 'sort' && showSort ? <SelectList show={showSort} curindex={this.state.curSortIndex} list={sortList} handleClick={this.handleSort.bind(this)}/> : null}
            {sortOrFilter === 'filter' && showFilter ? <SearchFilter show={showFilter} curcheck={this.state.checkFilter} list={filterList} triggerFilter={this.handleFilter.bind(this)}/> : null}
          </Fragment>
          : null
        }
        <ScrollView pullup={this.pullup}>
          <div className="result-list">
            {
              tabId === 1 && bookSuggest.map((item, index) => {
                if (index < 3 && item.tag !== 'bookname') {
                  return (
                    <div className="type" key={`${item.text}_${index}`}>
                      <span className={`iconfont
                          ${
                            item.tag === 'bookauthor' ?
                            'iconuserline' :
                            item.tag === 'cat' ?
                            'iconfenlei' :
                            item.tag === 'tag' ?
                            'iconshuqian' :
                            'iconshuqianline'
                          }`}>
                      </span>
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
            <BookList type={'1-1'} tag={sortType} data={searchResult} />
            {!this.state.hasmore ? <div className="load"><span>没有更多</span></div> : null}
          </div>
        </ScrollView>
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
    return (
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
                  onChange={this.changeSearch} />
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
                  return (<li key={item.word} onClick={this.getResult.bind(this, item.word)}>{item.word}</li>)
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
                    this.state.searchHistory.map((item, index) => {
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
                    <li className="item" key={`${item.url}`} onClick={this.getResult.bind(this, item.text)}>
                      <span className={`iconfont
                        ${
                          item.tag === 'bookauthor' ?
                          'iconuserline' :
                          item.tag === 'cat' ?
                          'iconfenlei' :
                          item.tag === 'tag' ?
                          'iconshuqian' :
                          'iconshuqianline'
                        }`}>
                      </span>
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
        : <Loading />
    )
  }
}

export default Search;
