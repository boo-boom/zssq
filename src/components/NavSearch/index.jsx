import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.scss';

@withRouter
class NavSearch extends Component {
  render() {
    return(
      <div className="nav-search">
        <div className="search" onClick={this.props.goSearch.bind(this, 123)}>
          <span className="iconfont iconsousuo"></span>
          <input type="text" placeholder="那年那蝉那把剑" readOnly/>
        </div>
      </div>
    )
  }
};

export default NavSearch;
