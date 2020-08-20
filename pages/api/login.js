import { connectDB } from '../../src/connectDB';
import User from '../../models/User';
import ErrorHandler from '../../middlewares/errorHandler';
import { serialize } from 'cookie';

connectDB();

export default ErrorHandler(
  async (req, res) => {
    switch (req.method) {
      case 'POST':
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');


        if (!user) {
          return res.status(400).json({ success: false, msg: 'Invalid Credentials' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
          return res.status(400).json({ success: false, msg: 'Invalid Credentials' });
        }

        const token = user.getSignedJwtToken();

        res.setHeader('Set-Cookie', serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,   // 1 hr
          path: '/'   // root of out domain, not /api
        }))

        return res.status(200).json({ success: true, token });
    }
  }

);