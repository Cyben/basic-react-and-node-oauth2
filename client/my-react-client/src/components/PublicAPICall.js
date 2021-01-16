import React from 'react'
import axios from 'axios'
import config from '../config'

export class PublicAPICall extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        alert(`Calling to our backend public api`)
        axios.get(`${config.backend.url}/public`)
            .then(res => {
                alert(`${res.data["message"]}`)
                window.location.href = '/'
            }).catch(err => {
                alert(err)
                window.location.href = '/'
            }
            )
    }

    render() {
        return <h1>Calling public api</h1>
    }
}
