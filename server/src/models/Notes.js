import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString()
            // only delete _id and __v from response object
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Note = mongoose.model('Note', NoteSchema);

export default Note;

