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

  return _(blogs)
          .countBy('author')
          .map((val, key) => ({ author: key, blogs: val }))
          .maxBy('blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return "empty array"
  }

  return _(blogs)
          .groupBy('author')
          .map((group) => ({ author: group[0].author, likes: _.sumBy(group, 'likes') }))
          .maxBy('likes')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}