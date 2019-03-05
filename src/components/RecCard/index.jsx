import React, { Component } from 'react'
import './style.scss'

class RecCard extends Component {
  render() {
    return (
      <div className="rec-card">
        <div className="card-item">
          <p className="title">阴间神探</p>
          <p className="author">道门老九【著】</p>
          <div className="cover">
            <img src="http://dummyimage.com/325x130" alt="" />
          </div>
        </div>
        <div className="card-item">
          <p className="title">阴间神探</p>
          <p className="author">道门老九【著】</p>
          <div className="cover">
            <img src="http://dummyimage.com/325x130" alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default RecCard;
