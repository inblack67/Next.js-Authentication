import { connectDB, disConnectDB } from '../../src/connectDB';
import User from '../../models/User';
import ErrorHandler from '../../middlewares/errorHandler';
import { serialize } from 'cookie';

connectDB();

export default ErrorHandler(
    async (req, res, next) => {
        switch (req.method) {
            case 'POST':
                const user = await User.create(req.body);
                const token = user.getSignedJwtToken();
                res.setHeader('Set-Cookie', serialize('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,   // 1 hr
                    path: '/'   // root of out domain, not /api
                }))
                return res.status(201).json({ success: true, token });
            default:
                return res.status(500).json({ success: false });
        }
    }

);