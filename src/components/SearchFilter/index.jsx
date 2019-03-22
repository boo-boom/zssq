import React, { Component } from 'react'
import ScrollView from '@components/ScrollView'
import './style.scss'

class SearchFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newFilters: [],
      isSure: false,
      curParam: '',
    }
  }
  componentWillMount() {
    if(this.props.show) {
      this.setState({
        isSure: this.isSure(this.props.list)
      })
    }
    this.setState({
      list: this.props.list
    })
  }
  handleClick(curItem, curIndex, parentIndex) {
    const list = this.props.list;
    const curList = list[parentIndex];
    if(curList.isMult) {
      if(curList.checkTotal > 0) {
        curList.list[curIndex].active = !curList.list[curIndex].active;
        if(curItem.active) {
          curList.checkTotal = Math.max(0, --curList.checkTotal);
        } else {
          curList.checkTotal = Math.min(3, ++curList.checkTotal);
        }
      } else {
        if(curItem.active) {
          curList.list[curIndex].active = false;
          curList.checkTotal = Math.min(3, ++curList.checkTotal);
        }
        console.log('最多选择3个')
      }
    } else {
      if(curItem.param === this.state.curParam) {
        curList.list[curIndex].active = !curList.list[curIndex].active;
      } else {
        curList.list.forEach(item => {
          item.active = false
        })
        curList.list[curIndex].active = true;
      }
      this.setState({
        curParam: curItem.param
      })
    }

    this.setState({
      isSure: this.isSure(list),
      newFilters: list
    })

  }
  handleFilter() {
    if(this.state.isSure) {
      const newFilters = this.state.newFilters;
      this.props.triggerFilter(newFilters);
    }
  }
  isSure(list) {
    let isSure = false;
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].list.length; j++) {
        if(list[i].list[j].active) {
          isSure = true;
          break
        }
      }
    }
    console.log(isSure)
    return isSure
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
        <ScrollView click={true}>
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
