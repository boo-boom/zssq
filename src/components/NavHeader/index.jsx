import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Header extends Component {
  render() {
    const props = this.props;
    return (
      <div className="nav-header">
        <h2>{props.title}</h2>
      </div>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;
