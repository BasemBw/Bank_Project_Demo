import React, { Component } from 'react'
import axios from "axios";
import './Breakdown.css'

export class Breakdown extends Component {

    state = {
        filterTranscationsData:{}
    }

    componentDidMount = async () => {

        let response = await axios.get(`http://localhost:6060/breakdown`)
        await this.setState({
            filterTranscationsData: response.data
        })

    }
    render() {
        let data = this.state.filterTranscationsData
        return (
            <div className='BreakDownDiv'>
                <h1>Break Down</h1>
                {Object.keys(data).map(key => {
                    return (<h3 key={key}>{key}   :   {data[key]}</h3>)
                })}
            </div>
        )
    }
}

export default Breakdown