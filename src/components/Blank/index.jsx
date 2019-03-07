import React from 'react'

const Blank = (props) => {
  return (
    <div className="blank" style={{height:props.height||'0.26667rem',background:"#eee"}}></div>
  )
}

export default Blank;
