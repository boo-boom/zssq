import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './style.scss';

@withRouter
class NavSearch extends Component {
  render() {
    const keyword = this.props.keyword;
    return(
      <div className="nav-search">
        <div className="search" onClick={this.props.goSearch.bind(this, keyword)}>
          <span className="iconfont iconsousuo"></span>
          <input type="text" placeholder={keyword} readOnly/>
        </div>
      </div>
    )
  }
};

NavSearch.propTypes = {
  keyword: PropTypes.string
}

export default NavSearch;
