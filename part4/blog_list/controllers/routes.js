const server = require('express').Router()
const Blog = require('../models/blog')

server.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

server.get('/', (request, response) => {
  response.send('Hi')
})

server.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = server