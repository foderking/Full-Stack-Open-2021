const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const pass = body.password

  if (pass.length < 3) {
    return  response.status(400).json({
      'error': "minimum length of password is 3"
    })
  }

  const saltRounds = 6
  const passwordHash = await bcrypt.hash(pass, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  result = await User.find({})
  res.status(200).json(result)
})

module.exports = usersRouter