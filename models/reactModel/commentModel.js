const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    commentUser: String,
    commentContent: String,
});
module.exports = mongoose.model('Comment',commentSchema);