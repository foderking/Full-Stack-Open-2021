const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const blog = require('../models/blog')

const initial = [
	{
	  title: 'foder',
	  author: 'king',
	  url: '.com',
	  likes: 4
	},
	{
	  title: 'sudo',
	  author: 'amsh',
	  url: 'root/api',
	  likes: 6
	}
]

beforeEach(async() => {
	await blog.deleteMany({})

	for (let each of initial) {
		let temp = new blog(each)
		await temp.save()
	}
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('should return correct amount of blog posts', async() => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(2)
})


afterAll(() => {
  mongoose.connection.close()
})