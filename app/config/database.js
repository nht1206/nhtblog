let mysql = require('mysql')

let connection = mysql.createConnection({
    supportBigNumbers: true,
    bigNumberStrings: true,
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10240994',
    password: 'YY1VZcXvMQ',
    database: 'sql10240994'
})

connection.connect()

let getConnection = () => {
    return connection
}
module.exports = {
    getConnection: getConnection
}
