const server = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comments = require('../models/comment')
const jwt = require('jsonwebtoken')



server.get('/', (request, response) => {
  response.send('Hi')
})

server.get('/api/blogs', async(request, response) => {
  blogs = await Blog.find({}).populate('user', {username: 1, name:1, id:1}).populate('comments')
  response.json(blogs)
})

server.post('/api/blogs', async(request, response) => {
  let blog = request.body
  const user = request.users

  blog = blog.likes ? {...blog, user: user._id }: {...blog, likes: 0, user: user._id }
  blog = new Blog(blog)
  result = await blog.save()

  user.blogs =  user.blogs.concat(result.id)
  // console.log(result)
  await user.save()
  response.status(201).json(result)
})


server.delete('/api/blogs/:id', async(request, response) => {
  if (!request.token || !request.users.id) {
    return response.status(401).json({error: 'invalid token'})
  }

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
  // console.log(body)
  result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  // console.log(result)
  response.json(result.toJSON())
})



server.post('/api/blogs/:id/comments', async(request, response) => {
  let comm = request.body
  const id = request.params.id

  const currBlog = await Blog.findById(id)

  comment = new Comments({
    ...comm,
    blog: id
  })
  result = await comment.save()

  currBlog.comments = currBlog.comments.concat(result.id)
  console.log(result, currBlog)
  await currBlog.save()
  response.status(201).json(currBlog)
})

module.exports = server