import React from 'react'
import axios from 'axios'
import config from '../config'

export class Logout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        alert(`Logging out of the session`)
        axios.get(`${config.backend.url}/logout`)
            .then(res => {
                alert(`The endSessionUrl we need to redirect to is:\n ${res.data}`)
                window.location.href = res.data
            }).catch(err => {
                alert(err)
                window.location.href = '/'
            })
    }

    render() {
        return <h1>Logging Out</h1>
    }
}
