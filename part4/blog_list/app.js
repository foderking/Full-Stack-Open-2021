const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogs = require('./controllers/routes')
const users = require('./controllers/user')
const mongoose = require('mongoose')
// require('express-async-errors')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())
app.use(blogs)
app.use('/api/users', users)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
module.exports = app