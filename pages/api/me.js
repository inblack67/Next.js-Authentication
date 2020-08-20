import ErrorHandler from '../../middlewares/errorHandler';
import { protect } from '../../middlewares/auth';
import User from '../../models/User';
import { connectDB } from '../../src/connectDB';

connectDB();

export default ErrorHandler(
    protect(
        async (req, res) => {
            switch (req.method) {
                case 'GET':

                    const user = await User.findById(req.user._id);

                    if (!user) {
                        return res.status(401).json({ success: true, error: 'Not Authorized' });
                    }

                    return res.status(200).json({ success: true, data: user });

                default:
                    return res.status(500).json({ success: false });
            }
        }
    )
);