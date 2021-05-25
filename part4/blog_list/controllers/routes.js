const server = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// const rand = (len) => {
//   return Math.floor(Math.random() * len)
// }

server.get('/', (request, response) => {
  response.send('Hi')
})

server.get('/api/blogs', async(request, response) => {
  blogs = await Blog.find({}).populate('user', {username: 1, name:1, id:1})
  response.json(blogs)
})

server.post('/api/blogs', async(request, response) => {
  let blog = request.body

  // const token = getTokenFrom(request)  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)  
  const user = await User.findById(decodedToken.id)
  
  if (!request.token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' }) 
  } 
  
  // temp = await User.find({})
  // console.log(temp)
  

  if (!user) {
    return response.status(400).json({
      "error": "invalid user id"
    })
  }

  blog = blog.likes ? {...blog, user: user._id }: {...blog, likes: 0, user: user._id }

  blog = new Blog(blog)
  result = await blog.save()

  user.blogs =  user.blogs.concat(result.id)

  await user.save()
  response.status(201).json(result)
})


// to be done later
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