//app/routers/admin
let Posts = require('../models/posts')
let Users = require('../models/users')
let isAdmin = require('../routers/authenticated').isAdmin

module.exports = (app) => {
    app.get('/admin', isAdmin, (req, res) => {
        res.render('admin/dashboard')
    })
    //posts management
    app.get('/admin/posts', isAdmin, (req, res) => {
        Posts.getAllPosts().then((data) => {
            res.render('admin/posts', { data: {
                posts: data,
                error: false
            }})
        }).catch((err) => {
            res.render('admin/posts', { data: {
                error: 'Did not load data.'
            }})
        })
    })
    /**
     * add new post 
     */
    app.get('/admin/post/', isAdmin, (req, res) => {
        res.render('admin/post', { message: []})
    })

    app.post('/admin/post/addnew', isAdmin, (req, res) => {
        req.checkBody('title').notEmpty()
        .withMessage('Title is required.')
        req.checkBody('content').notEmpty()
        .withMessage('Content is required.')
        req.checkBody('author').notEmpty()
        .withMessage('Author is required.')
        let errors = req.validationErrors()
        if (errors) {
            return res.render('admin/post', { message: errors})
        }
        let post = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            created_at: new Date(),
            updated_at: new Date()
        }
        Posts.addPost(post).then((data) => {
            req.flash('successMsg', 'Add new posts success.')
            res.redirect('/admin')
        }).catch((err) => {
            req.flash('errorsMsg', 'New posts not added.')
            res.redirect('/admin')
        })
    })
    /**
     * Edit post 
     * */
    app.get('/admin/post/edit/:id', isAdmin, (req, res) => {
        let id = req.params.id
        Posts.getPostById(id).then((data) => {
            res.render('admin/edit-post', { data: data,
            message: []
        })
        })
    })
    app.put('/admin/post/edit', isAdmin, (req, res) => {
        let params = req.body
        Posts.updatePost(params).then((data) => {
            res.json({ status_code : 200 })
        }).catch((err) => {
            res.json({ status_code: 500 })
        })
    })
    /**
     * Delete post
     */
    app.delete('/admin/post/delete', isAdmin, (req, res) => {
        let postId = req.body.id
        Posts.deletePost(postId).then((data) => {
            res.json({ status_code: 200} )
        }).catch((err) => {
            res.json({ status_code: 500 })
        })
    })
    //users management
    app.get('/admin/users', isAdmin, (req, res) => {
        Users.getUsers().then((data) => {
            res.render('admin/users', { data: {
                users: data,
                error: false
            }})
        }).catch((err) => {
            res.render('admin/users', { data: {
                error: 'Did not load data.'
            }})
        })
    })
    /**
     * edit user
     */
    app.get('/admin/user/edit/:id', isAdmin, (req, res) => {
        let id = req.params.id
        Users.findUserById(id).then((data) => {
            res.render('admin/edit-user', {
                data: data,
                message: []
            })
        })
    })
    app.put('/admin/user/edit', isAdmin, (req, res) => {
        let params = req.body
        console.log(params)
        Users.updateUser(params).then((data) => {
            res.json({ status_code : 200 })
        }).catch((err) => {
            res.json({ status_code: 500 })
        })
    })
}