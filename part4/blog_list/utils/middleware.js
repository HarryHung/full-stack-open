const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    console.log(authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    } else {
      request.token = null
    }

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  errorHandler
}