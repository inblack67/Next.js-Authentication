import { Schema, models, model } from 'mongoose';

const StorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Story title is required'],
        unique: [true, 'Story already exists'],
        trim: true,
        maxlength: [40, 'Story title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: [true, 'Story description is required'],
        trim: true,
        maxlength: [200, 'Story description cannot be more than 40 characters']
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

export default models.Story || model('Story', StorySchema);