import Story from '../../../models/Story';
import { connectDB } from '../../../src/connectDB';
import ErrorHandler from '../../../middlewares/errorHandler';
import { protect } from '../../../middlewares/auth';

connectDB();
export default ErrorHandler(
    protect(
        async (req, res) => {

            const { method } = req;

            switch (method) {
                case 'GET':
                    const stories = await Story.find();
                    return res.status(200).json({ success: true, data: stories });

                case 'POST':
                    const story = await Story.create(req.body);
                    return res.status(201).json({ success: true, data: story, msg: 'Story added' });
                default:
                    return res.status(400).json({ success: false });
            }
        }
    )
);