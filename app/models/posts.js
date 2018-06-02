//models/posts.js
let q = require('q')
let db = require('../config/database')

let connection = db.getConnection()

let getAllPosts = () => {
    let defer = q.defer()
    connection.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            return defer.reject(err)
        }
        defer.resolve(results)
    })
    return defer.promise
}

let getPostById = (id) => {
    let defer = q.defer()
    connection.query('SELECT * FROM posts WHERE id = ?', id, (err, results) => {
        if (err) {
            return defer.reject(err)
        }
        defer.resolve(results[0])    
    })
    return defer.promise
}

let addPost = (post) => {
    let defer = q.defer()
    connection.query('INSERT INTO posts SET ?', post, (err, results) => {
        if (err) {
            return defer.reject(err)
        }
        defer.resolve(results)
    })
    return defer.promise
}

let updatePost = (params) => {
    let defer = q.defer()
    connection.query('UPDATE posts SET title = ?, content = ?, author = ?, updated_at = ? WHERE id = ?', [
        params.title,
        params.content,
        params.author,
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

let deletePost = (id) => {
    let defer = q.defer()
    connection.query('DELETE FROM posts WHERE id = ?', id, (err, results) => {
        if (err) {
            return defer.reject(err)
        }
        defer.resolve(results)
    })
    return defer.promise
}

module.exports = {
    getAllPosts: getAllPosts,
    addPost: addPost,
    getPostById: getPostById,
    updatePost: updatePost,
    deletePost: deletePost
}
