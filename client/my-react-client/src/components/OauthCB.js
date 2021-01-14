import React from 'react';
import axios from 'axios';
import config from '../config'

export class OauthCB extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        this.state = {
            code: urlParams.get('code'),
            state: urlParams.get('state'),
        }
    }

    componentDidMount() {
        alert("Look at the current URL, The state and code parameters are over there.\nNow we are sending the code to our backend so it could exchange it safetly to a tokenSet and the state to prevent CSRF attacks")
        alert(`Exchanging the code "${this.state.code}"`)
        axios.post(`${config.backend.url}/code-to-token-exchange`, {
            code: this.state.code,
            state: this.state.state,
        })
            .then(res => {
                let access_token = res.data
                alert("Exchanged code to tokenSet in the backend and got the access token from the backend")
                alert(`The access_token is saved in a cookie, access_token=${access_token}`)
                document.cookie = `access_token=${access_token}`;
                window.location.href = '/'
            }).catch(err => {
                alert(err)
                window.location.href = '/'
            })
    }

    render() {
        return <h1>Exchanging code to token</h1>;
    }
}