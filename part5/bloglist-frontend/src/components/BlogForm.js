import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title:<input id='new-title' value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/></div>
        <div>author:<input id='new-author' value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)}/></div>
        <div>url:<input id='new-url' value={newURL} onChange={(event) => setNewURL(event.target.value)}/></div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm