import Story from '../../../models/Story';
import { connectDB } from '../../../utils/connectDB';

connectDB();

export default async (req, res) => {

    const { method, query: { id } } = req;

    switch (method) {
        case 'GET':
            try {
                const story = await Story.findById(id);
                return res.status(200).json({ success: true, data: story });
            } catch (err) {
                return res.status(400).json({ success: false, error: err });
            }

        case 'PUT':
            try {
                const story = await Story.findByIdAndUpdate(id, req.body, {
                    new: true
                });
                return res.status(200).json({ success: true, data: story, msg: 'Story updated' });
            } catch (err) {
                return res.status(400).json({ success: false, error: err });
            }

        case 'DELETE':
            try {
                await Story.findByIdAndDelete(id);
                return res.status(200).json({ success: true, msg: 'Story deleted' });
            } catch (err) {
                return res.status(400).json({ success: false, error: err });
            }
    }
}