let q = require('q')
let db = require('../config/database')

let connection = db.getConnection()

//Used to find user's information by id 
let findUserById = (id) => {
    let defer = q.defer()
    connection.query("SELECT * FROM users WHERE id = ?", id, (err, rows) => {
        if (err) {
            return defer.reject(err)
        }
        return defer.resolve(rows[0])
    })
    return defer.promise
}
//Used to find user's information by username
let findUserByUsername = (username) => {
    let defer = q.defer()
    connection.query("SELECT * FROM users WHERE username = ?", username, (err, rows) => {
        if (err) {
            return defer.reject(err)
        }
        return defer.resolve(rows[0])
    })
    return defer.promise
}

//used to add user into mysql
let addUser = (user) => {
    let defer = q.defer()
    connection.query("INSERT INTO users SET ?", user, (err, results, fields) => {
        if (err) {
            return defer.reject(err)
        }
        defer.resolve(results)
    })
    return defer.promise
}
//used to get all user in mysql
let getUsers = () => {
    let defer = q.defer()
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return defer.reject(err)
        }
        defer.resolve(results)
    })
    return defer.promise
}
//used to update user 

let updateUser = (params) => {
    let defer = q.defer()
    connection.query('UPDATE users SET name = ?, username = ?, email = ?, date_update = ? WHERE id = ?', [
        params.name,
        params.username,
        params.email,
        new Date(),
        params.id
    ], (err, results) => {
        if (err) {
            return defer.reject(err)
        }
        defer.resolve(results)
    })
    return defer.promise
}

module.exports = {
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    addUser: addUser,
    getUsers: getUsers,
    updateUser: updateUser
}