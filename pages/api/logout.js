import ErrorHandler from '../../middlewares/errorHandler';
import { protect } from '../../middlewares/auth';
import { serialize } from 'cookie';

export default ErrorHandler(
    protect(
        async (req, res) => {
            switch (req.method) {
                case 'GET':
                    
                    res.setHeader('Set-Cookie', serialize('token', 'none', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 0,
                        path: '/',
                    }))

                    return res.status(200).json({ success: true, msg: 'Logged out' });

                default:
                    return res.status(500).json({ success: false });
            }
        }
    )
);