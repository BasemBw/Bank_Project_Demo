import React, { Component } from 'react';
import Transcation from '../Transcation/Transcation'
import  "./Transactions.css";

export class Transactions extends Component {
  render() {
    return (
      <div className='AppTransactions'>
           {this.props.data.map(element => {
               return ( <Transcation DeleteTranscation={this.props.DeleteTranscation} key={element._id} Transcation={element} /> )
           })}
      </div>
    )
  }
}

export default Transactions