import React, { Component } from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types';
import { debounce } from '@assets/js/utils';
import './style.scss'

class ScrollView extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.children === this.props.children) {
      return false
    } else {
      this.scroll && this.scroll.refresh();
      return true
    }
  }
  componentWillMount() {
    // 防抖处理
    this.pullup = debounce(() => {
      this.props.pullup()
    }, 300)
  }
  componentDidMount() {
    this.initScroll()
  }
  componentWillUnmount() {
    this.scroll.destroy();
  }
  initScroll() {
    if(!this.refs.scrollView) return;
    if(!this.scroll) {
      this.scroll = new BScroll(`.${this.refs.scrollView.className}`, {
        click: this.props.click,
        probeType: 2,
      });
    } else {
      this.scroll.refresh();
    }
    // 是否实时监听
    this.props.listenScroll && this.scroll.on('scroll', pos => {
      this.props.listenScroll(pos)
    })
    // 滚动到底部
    this.props.pullup && this.scroll.on('scrollEnd', () => {
      if(this.scroll.y <= (this.scroll.maxScrollY + 100)){
        this.pullup()
      }
    })
  }
  render() {
    return (
      <div className="scroll-view" ref="scrollView">
        {this.props.children}
      </div>
    )
  }
}

ScrollView.propTypes = {
  click: PropTypes.bool
}
ScrollView.defaultProps = {
  click: true,
}

export default ScrollView;
