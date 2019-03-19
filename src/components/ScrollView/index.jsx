import React, { Component } from 'react'
import './style.scss'

class ScrollView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null
    }
    this.onLoadPage = this.onLoadPage.bind(this)
  }
  componentDidMount() {
    const scrollView = this.refs.scrollView;
    scrollView.addEventListener('scroll', this.onLoadPage);
  }
  componentWillUnmount() {
    const scrollView = this.refs.scrollView;
    scrollView.removeEventListener('scroll', this.onLoadPage);
  }
  onLoadPage() {
    const scrollView = this.refs.scrollView;
    const resultList = scrollView.querySelector('.result-list');
    const viewHeight = scrollView.offsetHeight;
    const listHeight = resultList.offsetHeight;
    const scrollTop = scrollView.scrollTop;
    clearTimeout(this.state.timer);
    this.setState({
      timer: setTimeout(() => {
        if(listHeight - (viewHeight + scrollTop) <= 100) {
          this.props.loadCallback && this.props.loadCallback();
          // console.log(viewHeight, listHeight, scrollTop)
        }
      }, 300)
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

export default ScrollView;
