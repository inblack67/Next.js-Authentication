import { connectDB, disConnectDB } from '../../src/connectDB';
import User from '../../models/User';
import ErrorHandler from '../../middlewares/errorHandler'

connectDB();

export default ErrorHandler(
    async (req, res, next) => {
        switch (req.method) {
            case 'POST':
                const user = await User.create(req.body);
                const token = user.getSignedJwtToken();
                return res.status(201).json({ success: true, token });
            default:
                return res.status(500).json({ success: false });
        }
    }

);