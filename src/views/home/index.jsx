import React, { Component } from "react";
import NavSearch from '@components/NavSearch';
import TabBarBlank from '@components/TabBarBlank';
import './style.scss';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <div className="content">
          <NavSearch />
        </div>
        <TabBarBlank/>
      </div>
    );
  }
}

export default Home;
