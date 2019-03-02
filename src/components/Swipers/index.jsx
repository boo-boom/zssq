import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import './style.scss';

@withRouter
class Swipers extends Component {
  componentWillUnmount() {
    // 离开组件时销毁swiper
    if(this.swiperHorizontalMenu) this.swiperHorizontalMenu.destroy()
  }
  componentDidMount() {
    switch (this.props.type) {
      case 'horizontalMenu':
        this.swiperHorizontalMenu = new Swiper(this.horizontalMenu, {
          slidesPerView: 'auto',
          spaceBetween: 30,
          freeMode: true,
        });
        break;
      default:
        return null;
    }
  }
  createTemplate() {
    const props = this.props;
    switch (props.type) {
      case 'horizontalMenu':
        return <div className="swiper-container" ref={(horizontalMenu) => { this.horizontalMenu = horizontalMenu }}>
                <div className="swiper-wrapper">
                  {/* <div className="swiper-slide">Slide 1</div>
                  <div className="swiper-slide">Slide 2</div>
                  <div className="swiper-slide">Slide 3</div>
                  <div className="swiper-slide">Slide 4</div>
                  <div className="swiper-slide">Slide 5</div>
                  <div className="swiper-slide">Slide 6</div>
                  <div className="swiper-slide">Slide 7</div>
                  <div className="swiper-slide">Slide 8</div>
                  <div className="swiper-slide">Slide 9</div>
                  <div className="swiper-slide">Slide 10</div> */}
                  {
                    props.data.map((item,index)=>{
                      return (
                        <div className="swiper-slide" key={`${item.name}-${index}`}>
                          <p className="cate-item">{item.name}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
      default:
        return null;
    }
  }
  render() {
    return (this.createTemplate());
  }
}

Swipers.propTypes = {
  type: PropTypes.string.isRequired
}

export default Swipers;
