import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import './Operations.css'


export class Operations extends Component {

  state = { 
    redirectToReferrer: false
  }

  handelClickWithdraw = async () => {
    if(await this.props.addTranscations('Withdraw')){
      await this.setState({
        redirectToReferrer : true
      })
    }
  }

  handelClickDeposit = async () => {
    if(await this.props.addTranscations('Deposit')){
      await this.setState({
        redirectToReferrer : true
      })
    }
  }

  render() {

    if (this.state.redirectToReferrer) { 
      return <Redirect to={'/'} />;
    }

    return (
      <div className='AddTranscations'>
        <h1>Insert Transcation</h1>
        <input name="amount" className='input' type="number" onChange={this.props.addOperations} placeholder=' Amount :' />
        <input name="vendor" className='input' onChange={this.props.addOperations} placeholder=' Vendor :' />
        <input name='category' className='input' onChange={this.props.addOperations} placeholder=' category :' />
        <div className='buttonsDiv'>
          <button className='Deposit btn-outline-primary' onClick={this.handelClickDeposit}>Deposit</button>
          <button className='Withdraw btn-outline-danger' onClick={this.handelClickWithdraw}>Withdraw</button>
        </div>
      </div>
    )
  }
}

export default Operations