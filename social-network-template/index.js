let express = require('express')
let cors = require('cors')
let fs = require('fs')
let path = require('path')

let app = express()
let port = 3005

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json())

let CURRENT_USER = 'admin'

function readJson(fileName) {
    let filePath = path.join(__dirname, 'json', fileName)
    let fileContent = fs.readFileSync(filePath, 'utf-8')
        .replace(/^\uFEFF/, '')
        .replace(/^п»ї/, '')

    return JSON.parse(fileContent)
}

function normalizeId(id, fallback) {
    if (id && typeof id === 'object' && id.$oid) {
        return id.$oid
    }

    return id || fallback
}

function normalizeDate(date) {
    if (date && typeof date === 'object' && date.$date) {
        return date.$date
    }

    return date || new Date().toISOString()
}

let users = readJson('users.json').map((user, index) => ({
    ...user,
    _id: normalizeId(user._id, String(index))
}))

let posts = readJson('posts.json').map((post, index) => ({
    ...post,
    _id: normalizeId(post._id, String(index)),
    createdAt: normalizeDate(post.createdAt),
    updatedAt: normalizeDate(post.updatedAt)
}))

function getCurrentUser() {
    return users.find((user) => user.username === CURRENT_USER)
}

function getPublicUser(user) {
    if (!user) {
        return null
    }

    return {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        info: user.info,
        phone: user.phone
    }
}

app.get('/profile', function (req, res) {
    res.send(getPublicUser(getCurrentUser()))
})

app.get('/user', function (req, res) {
    let username = req.query.username
    let user = users.find((item) => item.username === username)

    if (!user) {
        res.status(404).send({ message: 'User not found' })
        return
    }

    res.send(getPublicUser(user))
})

app.get('/user/posts', function (req, res) {
    let username = req.query.username
    let userPosts = posts
        .filter((post) => post.username === username)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    res.send(userPosts)
})

app.get('/users', function (req, res) {
    let friends = users
        .filter((user) => user.username !== CURRENT_USER)
        .map(getPublicUser)

    res.send(friends)
})

app.get('/feed', function (req, res) {
    let feed = posts
        .filter((post) => post.username !== CURRENT_USER)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)

    res.send(feed)
})

app.post('/post/create', function (req, res) {
    let content = String(req.body.content || '').trim()
    let user = getCurrentUser()

    if (!content) {
        res.status(400).send({ message: 'Post content is required' })
        return
    }

    let post = {
        _id: String(Date.now()),
        username: user.username,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    posts.unshift(post)
    res.status(201).send(post)
})

app.listen(port, function () {
    console.log(`http://localhost:${port}`)
})
