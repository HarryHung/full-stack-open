import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('render title and author, but not URL or number of likes', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: '369',
    url: 'http://www.test.com/',
    user: { username: 'test_user' }
  }

  const user = {
    username: 'test_user'
  }

  const mockHandler = jest.fn()

  const { container } = render(< Blog blog={blog} updateBlog={mockHandler} delBlog={mockHandler} user={user}/>)

  const title = container.querySelector('.blog-title')
  expect(title).toBeDefined()
  expect(title.textContent).toBe('test title')
  expect(title).toBeVisible()

  const author = container.querySelector('.blog-author')
  expect(author).toBeDefined()
  expect(author.textContent).toBe('test author')
  expect(author).toBeVisible()

  const url = container.querySelector('.blog-url')
  expect(url).toBeDefined()
  expect(url.textContent).toBe('http://www.test.com/')
  expect(url).not.toBeVisible()

  const likes = container.querySelector('.blog-likes')
  expect(likes).toBeDefined()
  expect(likes.textContent).toContain('369')
  expect(likes).not.toBeVisible()
})