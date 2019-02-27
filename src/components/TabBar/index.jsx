import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import style from './tabbar.module.scss';

class TabBar extends Component {
  render() {
    return (
      <div className={style.content}>
        <NavLink to="/home" activeClassName={style.active}>
          <span className="iconfont iconbao"></span>
          <span>书城</span>
        </NavLink>
        <NavLink to="/community" activeClassName={style.active}>
          <span className="iconfont iconshequ"></span>
          <span>社区</span>
        </NavLink>
        <NavLink to="/find" activeClassName={style.active}>
          <span className="iconfont iconfaxian"></span>
          <span>发现</span>
        </NavLink>
      </div>
    );
  }
}

export default TabBar;
