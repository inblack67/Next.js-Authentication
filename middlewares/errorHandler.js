import ErrorResponse from '../src/errorResponse';

const errorHandler = (err,req,res,next) => {

  let error = {...err};
  error.message = err.message;

  // console.log(error);
  
  if(err.name === 'CastError')
  {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate key
  if(err.code === 11000)
  {
    const message = `Resource already exists`;
    error = new ErrorResponse(message, 400);
  }

  // validation error
  if(err.name === 'ValidationError')
  {
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorResponse(message,400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
}

export default errorHandler;