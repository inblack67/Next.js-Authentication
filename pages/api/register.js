import { connectDB } from '../../src/connectDB';
import User from '../../models/User';

connectDB();

export default async (req, res, next) => {
    switch (req.method) {
        case 'POST':
            try {
                const user = await User.create(req.body);
                const token = user.getSignedJwtToken();
                return res.status(201).json({ success: true, token });
            } catch (err) {
                if (err.code === 11000) {
                    return res.status(400).json({ success: false, msg: 'User already exists' });
                }
            }
        default:
            return res.status(500).json({ success: false, msg: 'Something went wrong' });
    }
}
