//app/routers/home.js
let Post = require('../models/posts')
module.exports = (app) => {
    app.get('/', (req, res) => {
        Post.getAllPosts().then((posts) => {
            let data = {
                posts: posts,
                err: false
            }
            res.render('index', { data: data })
        }).catch((err) => {
            let data = {
                err: err
            }
            res.render('index', { data: data })
        })
    })
    app.get('/post/:id', (req, res) => {
        let id = req.params.id
        Post.getPostById(id).then((post) => {
            if (post) {
                let data = {
                    post: post,
                    err: false
                }
                res.render('post', { data: data })
            } else {
                res.status(404).send('Not found.')
            }
        }).catch((err) => {
            let data = {
                err: err
            }
            res.status(404).send(data)
        })
    })
}