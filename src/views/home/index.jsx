import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavSearch from '@components/NavSearch';
import TabBarBlank from '@components/TabBarBlank';
import Swipers from '@components/Swipers';
import CartBox from '@components/CartBox';
import RecCard from '@components/RecCard';
import HighCard from '@components/HighCard';
import BookList from '@components/BookList';
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
                  if(item.books.length) {
                    return(
                      <Fragment key={item.order}>
                        <Blank/>
                        <CartBox title={item.title}>
                          <div className="book-list-content">
                            {<BookList type={item.bookType==='1加4'?'1-4':'1-1'} tag="text" data={item.bookType==='1加4'?item.books:item.books.slice(0, 1)}/>}
                          </div>
                        </CartBox>
                      </Fragment>
                    )
                  } else {
                    return null
                  }
                })
              }
              <Blank/>
              {spread[3].advs.length ? <RecCard data={spread[3].advs}/> : null}
              <Blank/>
              {bookList[0].length ? <HighCard data={bookList[0]}/> : null}
            </div>
          : <Loading/>
        }
        <TabBarBlank />
      </div>
    );
  }
}

export default Home;
