const server = require('express').Router()
const Blog = require('../models/blog')


server.get('/', (request, response) => {
  response.send('Hi')
})

server.get('/api/blogs', async(request, response) => {
  blogs = await Blog.find({})
  response.json(blogs)
})

server.post('/api/blogs', async(request, response) => {
  let blog = request.body
  if ( !blog.title | !blog.url ) {
    response.status(400).end()
  }
  else {
    blog = blog.likes ? blog : {...blog, likes: 0}

    blog = new Blog(blog)
    result = await blog.save()
    response.status(201).json(result)
  }
})

server.delete('/api/blogs/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

server.put('/api/blogs/:id', async(request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(result.toJSON())
})


module.exports = server