let mysql = require('mysql')

let connection = mysql.createConnection({
    supportBigNumbers: true,
    bigNumberStrings: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogdb'
})

connection.connect()

let getConnection = () => {
    return connection
}
module.exports = {
    getConnection: getConnection
}
