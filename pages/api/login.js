import { connectDB } from '../../src/connectDB';
import User from '../../models/User';
import ErrorHandler from '../../middlewares/errorHandler'
import { send } from 'micro';

connectDB();

export default ErrorHandler(
  async (req, res) => {
    switch (req.method) {
      case 'POST':
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          send(res, 401, { success: false, msg: 'Invalid Credentials' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
          send(res, 401, { success: false, msg: 'Invalid Credentials' });
        }

        const token = user.getSignedJwtToken();
        return res.status(200).json({ success: true, token });
    }
  }

);