import React, { Component } from 'react'
import ScrollView from '@components/ScrollView'
import './style.scss'

class SearchFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      filters: {
        cate: [],       // 分类
        tag: [],        // 标签
        status: [],     // 状态
        price: [],      // 价格
        num: [],        // 字数
      },
      isSure: false
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
          typeArr.push(curItem.text);
        } else {
          typeArr.splice(typeArr.length - 1, 1);
        }
        console.log('123')
      } else {
        list[parentIndex].list[curIndex].active = false;
        typeArr.splice(typeArr.length - 1, 1);
        console.log('最多选择3个')
      }
      console.log(typeArr)
    } else {

    }




    // // 选中后处理
    // console.log(curItem)
    // if(curItem.active) {
    //   if (list[parentIndex].isMult) {
    //     // 可多选的分类
    //     if (filters[list[parentIndex].type].split(',').length - 1 < 3) {
    //       filters[list[parentIndex].type] += `${curItem.text},`;
    //     } else {
    //       console.log('最多选择3个')
    //     }
    //   } else {
    //     // 只能单选的分类
    //     list[parentIndex].list.forEach(item => {
    //       item.active = false
    //     })
    //     filters[list[parentIndex].type] = `${curItem.text},`
    //     list[parentIndex].list[curIndex].active = true;
    //   }
    // } else {
    //   // 取消选择时删除对应分类
    //   // filters[list[parentIndex].type].splice(filters[list[parentIndex].type].length - 1, 1);
    // }

    // 是否有选择分类
    let isSure = false;
    for(let item in filters) {
      if(filters[item]) {
        isSure = true
        break
      }
    }
    this.setState({
      list,
      isSure
    })
  }
  handleFilter() {
    const filters = this.state.filters;
    const newFilters = {};
    for(let item in filters) {
      if(filters[item].length) {
        console.log(filters[item])
        filters[item].forEach(arrItem => {
          newFilters[item] = arrItem.param
        })
        // newFilters[item] = filters[item].join(',');
      }
    }
    this.props.triggerFilter(newFilters);
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
