const server = require('express').Router()
const Blog = require('../models/blog')

server.get('/api/blogs', async(request, response) => {
  blogs = await Blog.find({})
  response.json(blogs)
    // .then(blogs => {
    //   response.json(blogs)
    // })
})

server.get('/', (request, response) => {
  response.send('Hi')
})

server.post('/api/blogs', async(request, response) => {
  const blog = new Blog(request.body)

  result = await blog.save()
  response.status(201).json(result)
})

module.exports = server