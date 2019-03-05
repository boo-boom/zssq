import React, { Component } from 'react';
import PropType from 'prop-types';
import './style.scss';

class NavSearch extends Component {
  render() {
    return(
      <div className="nav-search">
        <div className="search">
          <span className="iconfont iconsousuo"></span>
          <input type="text" placeholder="那年那蝉那把剑"/>
        </div>
      </div>
    )
  }
};

NavSearch.propType = {
  keyword: PropType.string
}

export default NavSearch;
