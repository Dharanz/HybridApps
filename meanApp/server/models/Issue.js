import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Issue = new Schema({
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    severty: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

export default mongoose.model('Issue', Issue);