const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const blog = require('../models/blog')


beforeEach(async() => {
	await blog.deleteMany({})

	for (let each of helper.initialNotes) {
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

test('id should be defined', async() => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
	expect(response.body[1].id).toBeDefined()
})

test('http post works correctly', async () => {
  await api
    .post('/api/blogs')
    .send(helper.postBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialNotes.length + 1)
})

test('object without like should default to 0', async() => {
  await api
    .post('/api/blogs')
    .send(helper.noLike)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  let response = await api.get('/api/blogs')
  response = response.body

  expect(response.find(each => each.title === 'wahala').likes).toBe(0)
  expect(response).toHaveLength(3)

})

test('blogs without the title, url properties should return 400 error', async() => {

  await api
    .post('/api/blogs')
    .send(helper.noTitle)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(helper.noUrl)
    .expect(400)  
  await api
    .post('/api/blogs')
    .send(helper.none)
    .expect(400)

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await api.get('/api/blogs')
    const noteToDelete =  notesAtStart.body[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await api.get('/api/blogs')
    expect(notesAtEnd.body).toHaveLength(
      notesAtStart.body.length - 1
    )
  })
})

test('updates blogs', async() => {
		
})


test('should return correct amount of blog posts', async(done) => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(2)
	done()
})





afterAll(() => {
  mongoose.connection.close()
})