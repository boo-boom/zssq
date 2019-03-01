import React, { Component } from "react";
import { withRouter, NavLink } from 'react-router-dom';
import style from './tabbar.module.scss';

@withRouter
class TabBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabBar: [
        {path: '/home', class: 'iconbao', title: '书城'},
        {path: '/community', class: 'iconshequ', title: '社区'},
        {path: '/find', class: 'iconfaxian', title: '发现'},
      ],
    }
  }

  showTabBar() {
    const rootPaths = ['/home', '/community', '/find'];
    const pathname = this.props.history.location.pathname;
    return rootPaths.findIndex(item => item === pathname) === -1 ? false : true;
  }

  render() {
    return (
      this.showTabBar()
      ? <div className={style.content}>
        {
          this.state.tabBar.map((item) => {
            return (
              <NavLink to={item.path} activeClassName={style.active} key={item.class}>
                <span className={`iconfont ${item.class} ${style.iconfont}`}></span>
                <span>{item.title}</span>
              </NavLink>
            )
          })
        }
      </div>
      : null
    );
  }
}

export default TabBar;
