function notFound(req, res, next) {
  const error = new Error("not found")
  console.log(error)
  next(error)
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
  })
}

export { errorHandler, notFound }
