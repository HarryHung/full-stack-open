import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, delBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const showWhenUser = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      delBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <div className='blog-title'>{blog.title}</div>
        <div className='blog-author'>{blog.author}</div>
        <button onClick={toggleVisibility} style={hideWhenVisible} className='blog-view-button'>view</button>
        <button onClick={toggleVisibility} style={showWhenVisible} className='blog-hide-button'>hide</button>
      </div>
      <div style={showWhenVisible}>
        <div className='blog-url'>{blog.url}</div>
        <div className='blog-likes'>likes {blog.likes}<button onClick={addLike}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={removeBlog} style={showWhenUser}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  delBlog:PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog