const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')
const Comments = require('../models/comment')
const jwt = require('jsonwebtoken')


describe('only valid blogs are created', () => {
  let toke // token

  beforeEach(async() => {
    // blog initialization
  	await blog.deleteMany({})

    const blog1 = new blog(helper.blogs.first)
    const blog2 = new blog(helper.blogs.second)
    await blog1.save()
    await blog2.save()

    //  user initialization
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sekret', 6)
    const user = new User({...helper.users.initial, passwordHash})

    await user.save()    


    // Comment initialization
    await Comments.deleteMany({})
    const comment1 = new Comments(helper.comment.first)
    comment1.save()
    
    // login user
    const result = await api
      .post('/api/login')
      .send({username: user.username, password: 'sekret' })

    toke = result.body.token
    jest.setTimeout(10000)
  })
  

  
  test('blogs are returned as json', async() => {

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


  test('should return correct amount of blog posts', async() => {
  	const response = await api.get('/api/blogs')
  	expect(response.body.length).toBe(2)
  })



  test('new user is created', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogs.valid)
      .set({"Authorization": 'bearer ' + toke})
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
  })

  test('blogs without like should default to 0', async() => {
    const title = helper.blogs.noLike.title

    await api
      .post('/api/blogs')
      .send(helper.blogs.noLike)
      .set({"Authorization": 'bearer ' + toke}) 
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let response = await api.get('/api/blogs')
    response = response.body

    expect(response.find(each => each.title === title).likes).toBe(0)
    expect(response).toHaveLength(3)

  })

 
  test('blogs with missing properties should return 400 error', async() => {

    let result = await api
      .post('/api/blogs')
      .send(helper.blogs.noTitle)
      .set({"Authorization": 'bearer ' + toke})
      .expect(400)

    expect(result.body.error).toContain('Path `title` is required')

  })

  test('should be able to delete', async () => {
    const notesAtStart = await api.get('/api/blogs')
    const noteToDelete =  notesAtStart.body[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .set({"Authorization": 'bearer ' + toke})
      .expect(204)

    const notesAtEnd = await api.get('/api/blogs')
    expect(notesAtEnd.body).toHaveLength(
      notesAtStart.body.length - 1
    )
  })
})


///////////////////////////////////////////////////
///
////////////////////////////////////////////////////

describe('only valid users are created', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sekret', 6)
    const initial = {...helper.users.initial, passwordHash}
    const user = await new User(initial)

    await user.save()
  })

  test('only one user at the beginning of the test', async() => {
    result = await api.get('/api/users')

    expect(result.body).toHaveLength(1)
  })

  test('adding a new user should work correctly', async() => {
    const usr = helper.users.validUser
    const usersAtStart = await helper.getUser()

    result = await api
      .post('/api/users')
      .send(usr)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUser()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(usr.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.getUser()
    const usr = helper.users.duplicateUser

    const result = await api
      .post('/api/users')
      .send(usr)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.getUser()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('invalid username should give a 400', async() => {
    const usr = helper.users.invalidUsername

    const result = await api
      .post('/api/users')
      .send(usr)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` (`J`) is shorter than the minimum allowed length')
  })


  test('invalid password should give a 400', async(done) => {
    const usr = helper.users.invalidPassword

    const result = await api
      .post('/api/users')
      .send(usr)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('minimum length of password is 3')
    done()
  })
})



afterAll(() => {
  mongoose.connection.close()
})