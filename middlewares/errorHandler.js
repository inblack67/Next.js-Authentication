import { send } from 'micro';
import ErrorResponse from '../src/errorResponse'

const handleErrors = fn => async (req, res) => {
    try {
        return await fn(req, res);
    } catch (err) {
        
        let error = { ...err };
        error.message = err.message;

        if (err.name === 'CastError') {
            const message = `Resource not found`;
            error = new ErrorResponse(message, 404);
        }

        // mongoose duplicate key
        if (err.code === 11000) {
            const message = `Resource already exists`;
            error = new ErrorResponse(message, 400);
        }

        // validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorResponse(message, 400);
        }

        send(res, error.statusCode || 500, {
            success: false,
            error: error.message || 'Server Error'
        });
    }
}

export default handleErrors;