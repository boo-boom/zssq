import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

class RecCard extends Component {
  render() {
    return (
      <div className="rec-card">
        {
          this.props.data.map(item => {
            return(
              <div className="card-item" key={item.title}>
                <p className="title">{item.title}</p>
                <p className="author">{item.simpleDes}</p>
                <div className="cover">
                  <img src={item.img} alt={item.title} />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

RecCard.propTypes = {
  data: PropTypes.array.isRequired,
}

export default RecCard;
