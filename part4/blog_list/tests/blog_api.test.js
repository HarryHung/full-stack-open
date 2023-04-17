const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let TOKEN = ''

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('test_password', 10)

  const user = new User({ username: 'test_user', passwordHash })
  await user.save()

  const login_resp = await api
    .post('/api/login')
    .send({ username: 'test_user', password: 'test_password' })
  
  TOKEN = login_resp.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are 6 blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id, not _id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]).not.toHaveProperty('_id')
})

test ('a valid blog can be added' , async () => {
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "https://newblog.com/",
    likes: 64,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'New Blog'
  )
})

test ('default to 0 if the likes property is missing from the request' , async () => {
  const newBlog = {
    title: "Missing Like Title",
    author: "Missing Like Author",
    url: "https://missing-like.com/"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()  

  const blogToCheck = blogsAtEnd.at(-1)

  const resultBlog = await api
    .get(`/api/blogs/${blogToCheck.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(resultBlog.body.likes).toEqual(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "Missing title",
    url: "https://missing-title.com/"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: "Missing url",
    author: "Missing url",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test ('blog cannot be added without token' , async () => {
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "https://newblog.com/",
    likes: 64,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('deletion of a blog', async () => {
  const newBlog = {
    title: "Missing Like Title",
    author: "Missing Like Author",
    url: "https://missing-like.com/"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtStart = await helper.blogsInDb()

  const blogToDelete = blogsAtStart.at(-1)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    blogsAtStart.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('update likes of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newLikes = 721831
  blogToUpdate.likes = newLikes

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const updatedBlog = await Blog.findById(blogToUpdate.id)
  
  expect(updatedBlog.likes).toEqual(newLikes)
})

afterAll(async () => {
  await mongoose.connection.close()
})
