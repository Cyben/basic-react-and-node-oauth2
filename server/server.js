const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require("../client/my-react-client/src/config.js")
const { Issuer, generators } = require('openid-client');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let client;
const state = generators.state()
const nonce = generators.nonce()

Issuer.discover(config.auth_service.issuer) // => Promise
  .then(function (Issuer) {
    console.log('Discovered issuer %s %O', Issuer.issuer, Issuer.metadata);
    client = new Issuer.Client({
      client_id: config.auth_service.client_id,
      client_secret: config.auth_service.client_secret,
      redirect_uris: [`${config.frontend.url}/oauth-callback`], //frontend-callback
      response_types: ['code'],
    }); // => Client
  });

// Utility function to parse JWT tokens 
const getParsedJwt = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch (e) {
    return undefined
  }
}

// Protect endpoinds from unauthenticated users
const requireAuthN = (req, res, next) => {
  let access_token = req.headers["authorization"].split(" ")[1]
  client.introspect(access_token)
    .then((isVerified) => {
      if (isVerified.active) {
        console.log(isVerified.active)
        next()
      }
      else {
        console.log(isVerified)
        return res.status(401).send('Invalid token')
      }
    })
}

// Protect endpoinds from unauthorized users
// This is a basic example, it doesn't check recursive objects
// Method option types:
// ALL - all the other options should be in the given token
// ONE - at least one option should be in the given token
const requireAuthZ = options => {
  return (req, res, next) => {
    let method = options["method"]
    if (method !== "ALL" && method !== "ONE") {
      throw `method should be either "ALL" or "ONE" and not ${method}`;
    }

    let claim_check = []
    const access_token = req.headers["authorization"].split(" ")[1]
    const parsetAccess_token = getParsedJwt(access_token)
    for (const [key, value] of Object.entries(options)) {
      if (key !== "method") {
        if (parsetAccess_token[key].includes(value)) {
          console.log(`The user has the claim ${key} with the value ${value}`)
          claim_check.push(true)
        }
        else {
          console.log(`The user doesn't have the claim ${key} with the value ${value}`)
          claim_check.push(false)
        }
      }
    }

    if ((claim_check.some(item => item === true) && method === "ONE") || (claim_check.every(item => item === true) && method === "ALL")) {
      next()
    } else {
      res.status(403).send("Forbidden")
    }
  }
}

app.get('/login', (req, res) => {
  let authUrl = client.authorizationUrl({
    scope: 'openid',
    state,
    nonce
  })
  res.send(authUrl)
})

app.post('/code-to-token-exchange', (req, res) => {
  const params = client.callbackParams(req);
  client.callback(`${config.frontend.url}/oauth-callback`, params, { state, nonce })
    .then((tokenSet) => {
      console.log("\n-------------------------TOKEN SET-------------------------")
      console.log(tokenSet)
      console.log("\n----------------------ID TOKEN CLAIMS----------------------")
      console.log(tokenSet.claims())
      res.send(tokenSet["access_token"])
    })
})

// Anyone can access this route
app.get('/public', (req, res) => res.send('This is a public endpoint, therefore everyone has access to it.'));

// A protected endpoint, just authentication ( this endpoint checks that the given token is valid )
app.get('/protected', requireAuthN, (req, res) => {
  res.send('Hey there authenticated user')
});

// // TRY IT YOURSELF, uncomment this section and comment all others protected endpoints 
// // A protected endpoint, authentication and authorization 
// // ( this endpoint checks that the given token is valid, and that at least one of the given claims exists in the token )
// // !NOT INCLUDING THE METHOD OPTION!
// // @see requireAuthZ line 59
// app.get('/protected', requireAuthN, requireAuthZ({ method: 'ONE', group: 'testgroup', scope: 'email' }), (req, res) => {
//   res.send('Hey there authenticated user')
// });

// // TRY IT YOURSELF, uncomment this section and comment all others protected endpoints 
// // A protected endpoint, authentication and authorization 
// // ( this endpoint checks that the given token is valid, and that all of the given claims exists in the token )
// // !NOT INCLUDING THE METHOD OPTION!
// // @see requireAuthZ line 59
// app.get('/protected', requireAuthN, requireAuthZ({ method: 'ALL', group: 'testgroup', scope: 'email' }), (req, res) => {
//   res.send('Hey there authenticated user')
// });

app.listen(config.backend.port, () => {
  console.log(`Example app listening at ${config.backend.url}`)
})