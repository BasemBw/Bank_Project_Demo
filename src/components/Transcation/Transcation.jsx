import React, { Component } from 'react'
import './Transcation.css'

export class Transcation extends Component {

  handelClick = () => {

    this.props.DeleteTranscation(this.props.Transcation._id)

  }

  render() {
    return (
      <div className='Transcation'>
        <div className='TranscationInfo'>
          <div className='vendor'><h3>{this.props.Transcation.vendor}</h3></div>
          <h4>{this.props.Transcation.category}</h4>
        </div>
        <div className='TranscationCount'>
          <div className='amount' style={{ backgroundColor :  this.props.Transcation.amount > 500 ? "lime" : "tomato"}}>
            <h3>{this.props.Transcation.amount}</h3>
          </div>
          <button onClick={this.handelClick} className='delete'>Delete</button>
        </div>
      </div>
    )
  }
}

export default Transcation