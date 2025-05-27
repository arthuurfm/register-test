function errorHandler(error, req, res, next) {
  const status = error.statusCode || 500;
  const message = error.message;
  
  res.status(status).json({error: true, message});
}

export default errorHandler;