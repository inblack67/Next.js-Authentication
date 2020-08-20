import { connectDB } from '../../src/connectDB';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'POST':

      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(400).json({ success: false, msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, User.password);

      if (!isMatch) {
        return res.status(400).json({ success: false, msg: 'Invalid Credentials' });
      }

      const token = user.getSignedJwtToken();
      return res.status(201).json({ success: true, token });
  }
}
