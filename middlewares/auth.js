import { verify } from 'jsonwebtoken';
import { send } from 'micro';
import User from '../models/User';
import ErrorHandler from './errorHandler';


export const protect = fn => ErrorHandler(
    async (req, res) => {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // if cookie has the token, if not the header
        else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ success: false, msg: 'Not Authorized' });
        }

        const decoded = verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        return await fn(req, res);
    }
);
