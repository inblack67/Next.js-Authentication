import Story from '../../../models/Story';
import { connectDB, disConnectDB } from '../../../src/connectDB';
import ErrorHandler from '../../../middlewares/errorHandler';
import { protect } from '../../../middlewares/auth';

connectDB();

export default ErrorHandler(
    protect(
        async (req, res) => {

            const { method, query: { id } } = req;

            switch (method) {
                case 'GET':
                    const story = await Story.findById(id);
                    return res.status(200).json({ success: true, data: story });

                case 'PUT':
                    const putStory = await Story.findById(id);

                    if (!putStory) {
                        return res.status(400).json({ success: false, msg: 'Resource not found' });
                    }

                    if (putStory.user.toString() !== req.user._id.toString()) {
                        return res.status(401).json({ success: false, msg: 'Not Authorized' });
                    }
                    const updatedStory = await Story.findByIdAndUpdate(id, req.body, {
                        new: true
                    });
                    return res.status(200).json({ success: true, data: updatedStory, msg: 'Story updated' });

                case 'DELETE':
                    const delStory = await Story.findById(id);
                    if (!delStory) {
                        return res.status(400).json({ success: false, msg: 'Resource not found' });
                    }
                    if (delStory.user.toString() !== req.user._id.toString()) {
                        return res.status(401).json({ success: false, msg: 'Not Authorized' });
                    }

                    await Story.findByIdAndDelete(id);

                    return res.status(200).json({ success: true, msg: 'Story deleted' });
            }
        }
    )
);