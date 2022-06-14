import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Transactions from './components/Transactions/Transactions';
import Operations from './components/Operations/Operations';
import Breakdown from './components/Breakdown/Breakdown';
import axios from "axios";

export class App extends Component {
  state = {
    TranscationsData: [],
    amount: 0,
    vendor: '',
    category: '',
    openSnackbar: false
  }

  componentDidMount = async () => {
    let response = await axios.get('http://localhost:6060/transaction')
    this.setState({
      TranscationsData: response.data
    })
  }

  sumBalance = () => {
    let sumBalance = 0
    this.state.TranscationsData.forEach(obj => {
      sumBalance += obj.amount
    })
    return sumBalance
  }

  addOperations = (event) => {
    let value = event.target.value
    let name = event.target.name
    this.setState({
      [name]: value
    })
  }

  addTranscations = async (TranscationsTybe) => {

    const { amount, vendor, category } = this.state
    if (TranscationsTybe === 'Withdraw') {
      await this.setState({ amount: Number(this.state.amount) * -1 })
    }

    if(amount === "0" || vendor.trim() === "" || category.trim() === ""){
       alert("please fill the fields!!")
       return false
    } 

    await axios.post('http://localhost:6060/transaction', {
      "amount": amount,
      "vendor": vendor,
      "category": category
    })

    let response = await axios.get('http://localhost:6060/transaction')
    this.setState({
      TranscationsData: response.data
    })

    return true
  }

  DeleteTranscation = async (id) => {

    await axios.delete(`http://localhost:6060/transaction/${id}`)

    let response = await axios.get('http://localhost:6060/transaction')
    this.setState({
      TranscationsData: response.data
    })

  }

  render() {
    return (
      <Router>
        <div className='App'>
          <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <Link className='navbar-brand' to="/"><span>Transcations</span></Link>
            <Link className='navbar-brand' to="/operations"><span>Operations</span></Link>
            <Link className='navbar-brand' to="/breakdown"><span>Breakdown</span></Link>

            <div className='balance ms-auto mb-2 mb-lg-0'>
              <span> Balance : {this.sumBalance()}</span>
            </div>
          </nav>
          <div className='contanier'>
            <Route exact path="/" render={() => <Transactions DeleteTranscation={this.DeleteTranscation} data={this.state.TranscationsData} />} />
            <Route exact path="/operations" render={() => <Operations addOperations={this.addOperations} addTranscations={this.addTranscations} />} />
            <Route exact path="/breakdown" render={() => <Breakdown />} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
