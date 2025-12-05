const mongoose = require('mongoose');

const ImageRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  model: {
    type: String,
    required: true,
    enum: ['Stable Diffusion', 'DALL·E', 'MidJourney', '文心一格']
  },
  prompt: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  creditsUsed: {
    type: Number,
    required: true,
    default: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: Object,
    default: {}
  }
});

// 创建索引
ImageRecordSchema.index({ userId: 1, createdAt: -1 });
ImageRecordSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ImageRecord', ImageRecordSchema);
