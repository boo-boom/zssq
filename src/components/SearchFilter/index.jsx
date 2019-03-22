import React, { Component } from 'react'
import ScrollView from '@components/ScrollView'
import './style.scss'

class SearchFilter extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.curcheck)
    this.state = {
      list: [],
      filters: {
        cate: [],       // 分类
        tag: [],        // 标签
        status: [],     // 状态
        price: [],      // 价格
        num: [],        // 字数
      },
      isSure: false,
      newFilters: {},   // 字符串后的数据
    }
  }
  handleClick(curItem, curIndex, parentIndex) {
    const list = this.props.list;
    const filters = this.state.filters;
    const typeArr = filters[list[parentIndex].type];
    if(list[parentIndex].isMult) {
      if(typeArr.length < 3) {
        list[parentIndex].list[curIndex].active = !list[parentIndex].list[curIndex].active;
        if(curItem.active) {
          typeArr.push(list[parentIndex].type === 'num' ? curItem.param : curItem.text);
        } else {
          const index = typeArr.indexOf(curItem.text);
          if(index > -1) typeArr.splice(typeArr.indexOf(curItem.text), 1);
        }
      } else {
        list[parentIndex].list[curIndex].active = false;
        const index = typeArr.indexOf(curItem.text);
        if(index > -1) typeArr.splice(typeArr.indexOf(curItem.text), 1);
        console.log('最多选择3个')
      }
    } else {
      if(filters[list[parentIndex].type] === curItem.param) {
        list[parentIndex].list[curIndex].active = !list[parentIndex].list[curIndex].active;
        if(curItem.active) {
          filters[list[parentIndex].type] = curItem.param;
        } else {
          delete filters[list[parentIndex].type];
        }
      } else {
        list[parentIndex].list.forEach(item => {
          item.active = false
        })
        filters[list[parentIndex].type] = curItem.param;
        list[parentIndex].list[curIndex].active = true;
      }
    }
    // console.log(filters)

    // 是否有选择分类
    let isSure = false;
    const _filters = {};
    for(let item in filters) {
      if(Object.prototype.toString.call(filters[item]) === '[object Array]' && filters[item].length) {
        _filters[item] = filters[item].join(',');
      } else {
        _filters[item] = filters[item];
      }
      if(Object.prototype.toString.call(_filters[item]) === '[object Array]') {
        if(!_filters[item].length) _filters[item] = '';
      }
    }
    for(let item in _filters) {
      if(_filters[item]) {
        isSure = true;
        break
      } else {
        isSure = false;
      }
    }
    this.setState({
      list,
      isSure,
      newFilters: _filters
    })
  }
  handleFilter() {
    if(this.state.isSure) {
      const newFilters = this.state.newFilters;
      this.props.triggerFilter(newFilters);
    }
  }
  createLi(list, index) {
    if (list && list.length && list[0].text) {
      return (
        list.map((li, idx) => {
          return (<li className={`${li.active ? 'active' : ''}`} key={`${li.text}-${idx}`} onClick={this.handleClick.bind(this, li, idx, index)}>{li.text}</li>)
        })
      )
    }
    return null
  }
  render() {
    const list = this.props.list;
    return (
      <div className={`search-filter ${this.props.show ? 'show' : 'hide'}`}>
        <ScrollView>
          <div className="filter-scroll">
            {
              list.map((item, index) => {
                return (
                  <div className="filter-item" key={item.title}>
                    <p className="title">{item.title}</p>
                    <ul>
                      {this.createLi(item.list, index)}
                    </ul>
                  </div>
                )
              })
            }
          </div>
        </ScrollView>
        <div className="bottom">
          <div className={`btn ${this.state.isSure ? 'sure' : ''}`} onClick={this.handleFilter.bind(this)}>确认</div>
        </div>
      </div>
    )
  }
}

export default SearchFilter;
