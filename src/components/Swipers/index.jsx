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
    if(this.swiperBanner) this.swiperBanner.destroy()
  }
  componentDidMount() {
    switch (this.props.type) {
      case 'banner':
        this.swiperBanner = new Swiper(this.banner, {
          slidesPerView: 1,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
        break;
      default:
        return null;
    }
  }
  createTemplate() {
    const props = this.props;
    switch (props.type) {
      case 'banner':
        return (
          <div className="swpier-banner">
            <div className="swiper-container" ref={(banner) => { this.banner = banner }}>
                  <div className="swiper-wrapper">
                    {
                      props.data.map(item => {
                        return (
                          <div className="swiper-slide" key={item.link}>
                            <img src={item.img} alt={item.title} />
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
          </div>
        )
      default:
        return null;
    }
  }
  render() {
    return (this.createTemplate());
  }
}

Swipers.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default Swipers;
