// const { CLIEngine } = require('eslint')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'json: invalid token'
		})
	} else {
		response.status(400).json({
			error: error.message
		})
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {  
	
	const authorization = request.get('authorization') 
	
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
		const token = authorization.substring(7)
		request.token = token 
	} 
	else {
		request.token = null
	} 
	next()
}

const userExtractor = async(request, response, next) => {
	if (request.token) {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)  
		const user = await User.findById(decodedToken.id)


		if (!request.token || !decodedToken.id) {  
			console.log('something wrong with token')  
			return response.status(401).json({ error: 'token missing or invalid' }) 
		}

		if (!user) {
			request.users = null
			return response.status(400).json({
				"error": "invalid user id"
			})
		}		

		request.users = user
	}
	else {
		request.users = null
	}


	next()
	
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}