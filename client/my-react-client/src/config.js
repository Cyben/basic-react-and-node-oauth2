var config = module.exports = {};

config.frontend = {
    port: 3000,
    host: 'localhost',
}

config.frontend.url = `http://${config.frontend.host}:${config.frontend.port}`

config.backend = {
    port: 5000,
    host: 'localhost',
}

config.backend.url = `http://${config.backend.host}:${config.backend.port}`

// config.auth_service = {
//     issuer: 'http://localhost:8080/auth/realms/demorealm',
//     client_id: 'change_me',
//     client_secret: 'change_me'
// }

config.auth_service = {
    issuer: 'http://localhost:8080/auth/realms/test',
    client_id: 'test',
    client_secret: '52178877-e00c-4d0f-b59e-f11ececa7223'
}