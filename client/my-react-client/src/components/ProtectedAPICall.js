import React from 'react';
import axios from 'axios';
import config from '../config'

export class ProtectedAPICall extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let access_token = document.cookie.split("=")[1]
        alert(`Calling to our backend protected api with the header\n'Authorization: Bearer ${access_token}' `)
        axios.get(`${config.backend.url}/protected`, {
            headers: {
                Authorization: `Bearer ${access_token || null}`
            }
        })
            .then(res => {
                alert(`${res.data}`)
                window.location.href = '/'
            }).catch(err => {
                alert(err)
                window.location.href = '/'
            })
    }

    render() {
        return <h1>Calling protected api</h1>;
    }
}
