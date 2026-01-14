const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, { timestamps: true });

const saveModel = mongoose.model('save', saveSchema);
module.exports = saveModel;