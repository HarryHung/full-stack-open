const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return "empty array"
  }
  return blogs.reduce((pre, cur) => pre.likes < cur.likes ? cur : pre)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return "empty array"
  }

  const countBy = _.countBy(blogs, 'author')
  const countByReformat = _.map(countBy, (val, key) => ({ author: key, blogs: val }))
  return _.maxBy(countByReformat, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}