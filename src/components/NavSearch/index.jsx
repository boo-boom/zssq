import React, { Component } from 'react';
import PropType from 'prop-types';
import './style.scss';

class NavSearch extends Component {
  render() {
    return(
      <div className="nav-search">{this.props.keyword || 'NavSearch'}</div>
    )
  }
};

NavSearch.propType = {
  keyword: PropType.string
}

export default NavSearch;
