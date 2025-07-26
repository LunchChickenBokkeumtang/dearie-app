// backend/models/Notification.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId:    { type: String,  required: true, index: true },
  type:      { type: String,  required: true, enum: ['ALL','TXT','AESPA', 'IU','RIIZE','IVE'] },
  title:     { type: String,  required: true },
  message:   { type: String,  required: true },
  payload:   { type: Object,  default: {} },
  isRead:    { type: Boolean, default: false },
  createdAt: { type: Date,    default: Date.now, index: -1 }
});

// 모델을 'Notification' 이름으로 내보냅니다.
module.exports = mongoose.model('Notification', notificationSchema);
