import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavSearch from '@components/NavSearch';
import TabBarBlank from '@components/TabBarBlank';
import Swipers from '@components/Swipers';
import CardList from '@components/CardList';
import RecCard from '@components/RecCard';
import HighCard from '@components/HighCard';
import Blank from '@components/Blank';
import Loading from '@components/Loading';
import { getTest, getSearchRecommend, getJinxuanData } from './reducer';
import './style.scss';

@connect(
  state => ({home: state.home}),
  { getTest, getSearchRecommend, getJinxuanData }
)
class Home extends Component {
  componentWillMount() {
    this.props.getSearchRecommend();
    this.props.getJinxuanData();
  }
  goSearch(params) {
    this.props.history.push('/search')
  }
  render() {
    const home = this.props.home;
    const loadEnd = home.loadEnd;
    const jingxuan = home.jingxuan;
    const spread = jingxuan.spread;
    const nodes = jingxuan.nodes;
    const bookList = jingxuan.bookList;
    const searchRecommend = home.searchRecommend;
    return (
      <div id="home">
        {
          loadEnd
          ? <div className="content">
              <NavSearch goSearch={this.goSearch} keyword={searchRecommend} />
              <div className="banner">
                <Swipers type="banner" data={spread[0].advs} />
              </div>
              <div className="cate-nav">
                {
                  spread[1].advs.map(item => {
                    if(item.order === 4) return null;
                    return (
                      <Link className="item" to="/classify" key={item.title}>
                        <img src={item.img} alt="" />
                        <span className="text">{item.title}</span>
                      </Link>
                    )
                  })
                }
              </div>
              {
                nodes.map(item => {
                  return(
                    <Fragment key={item.order}>
                      <Blank/>
                      <CardList type={item.bookType==='1加4'?'1-4':'1-1'} data={item}/>
                    </Fragment>
                  )
                })
              }
              <Blank/>
              <RecCard data={spread[3].advs}/>
              <Blank/>
              <HighCard data={bookList[0]}/>
            </div>
          : <Loading/>
        }
        <TabBarBlank />
      </div>
    );
  }
}

export default Home;
