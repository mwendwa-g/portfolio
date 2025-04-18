const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: { // sender's email
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: { // body of the message
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
});

exports.Message = mongoose.model('Message', messageSchema);