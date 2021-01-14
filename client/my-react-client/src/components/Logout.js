import React from 'react';
import config from '../config'

export class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        alert(`Logging out of the session`)
        window.location.href = `${config.auth_service.issuer}/protocol/openid-connect/logout?redirect_uri=${config.frontend.url}`
    }

    render() {
        return <h1>Logging Out</h1>;
    }
}
