import React from 'react';
import axios from 'axios';
import config from '../config'

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    alert("Redirecting to our backend to get the authorization url we should redirect to")
    axios.get(`${config.backend.url}/login`)
      .then(res => {
        alert(`The authorizationUrl we need to redirect to is:\n ${res.data}`)
        window.location.href = res.data
      }).catch(err => {
        alert(err)
        window.location.href = '/'
      })
  }

  render() {
    return <h1>Getting authorization code</h1>;
  }
}
