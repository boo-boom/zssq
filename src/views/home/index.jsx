import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavSearch from '@components/NavSearch';
import TabBarBlank from '@components/TabBarBlank';
import Swipers from '@components/Swipers';
import CardList from '@components/CardList';
import RecCard from '@components/RecCard';
import HighCard from '@components/HighCard';
import Blank from '@components/Blank';
import { getTest, getJinxuanData } from './reducer';
import './style.scss';

@connect(
  state => ({home: state.home}),
  { getTest, getJinxuanData }
)
class Home extends Component {
  componentWillMount() {
    this.props.getJinxuanData();
  }
  render() {
    console.log(this.props.home)
    return (
      <div id="home">
        <div className="content">
          <NavSearch />
          <div className="banner">
            <Swipers type="banner" />
          </div>
          <div className="cate-nav">
            <Link className="item" to="/classify">
              <span className="iconfont iconfenlei1"></span>
              <span className="text">分类</span>
            </Link>
            <div className="item">
              <span className="iconfont iconpaihang"></span>
              <span className="text">排行</span>
            </div>
            <div className="item">
              <span className="iconfont iconshu"></span>
              <span className="text">书单</span>
            </div>
            <div className="item">
              <span className="iconfont iconhuzhu"></span>
              <span className="text">书荒</span>
            </div>
          </div>
          <div className="rec-link">
            <div className="left">
              <img src="http://dummyimage.com/70x70" alt="" />
            </div>
            <div className="middle">
              <p className="title">调整口味，为您精准推荐好书</p>
              <p className="desc">当前暂未设置阅读口味</p>
            </div>
            <div className="right">
              <span className="iconfont iconarrowll-r"></span>
            </div>
          </div>
          <Blank/>
          <CardList type="1-4"/>
          <Blank/>
          <CardList type="1-1"/>
          <Blank/>
          <RecCard/>
          <Blank/>
          <HighCard/>
        </div>
        <TabBarBlank />
      </div>
    );
  }
}

export default Home;
