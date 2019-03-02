import React, { Component } from "react";
import NavSearch from '@components/NavSearch';
import TabBarBlank from '@components/TabBarBlank';
import './style.scss';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cates: [
        {name: '读书'},
        {name: '读书'},
        {name: '读书'},
        {name: '读书'},
        {name: '读书'},
        {name: '读书'},
        {name: '读书'},
        {name: '读书'},
      ]
    }
  }
  render() {
    return (
      <div id="home">
        <div className="content">
          <NavSearch />
          <div className="horizontal-menu">
            <ul>
              <li className="active">读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
              <li>读书</li>
            </ul>
            <span className="iconfont iconmore"></span>
          </div>
        </div>
        <TabBarBlank />
      </div>
    );
  }
}

export default Home;
