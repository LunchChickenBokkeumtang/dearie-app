// server.js

// 1) 환경 변수 로드
require('dotenv').config();
console.log('▶ Loaded MONGODB_URI:', process.env.MONGODB_URI);

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

// 2) 분리된 Notification 모델 불러오기
const Notification = require('./models/Notification');

const app  = express();
const port = process.env.PORT || 4000;

// 3) CORS 설정: 프론트 ngrok URL 또는 '*' (개발용)
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));

// 4) JSON 바디 파싱
app.use(express.json());

// 5) MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🎉 MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 6) 헬스체크용 엔드포인트
app.get('/', (req, res) => {
  res.send('OK');
});

// 7) 알림 조회: GET /api/notifications?userId=…
app.get('/api/notifications', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'userId query parameter is required' });
  }
  try {
    const list = await Notification
      .find({ userId })
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error('❌ Error in GET /api/notifications:', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// 8) 읽음 처리: PATCH /api/notifications/:id/read
app.patch('/api/notifications/:id/read', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error in PATCH /api/notifications/:id/read:', err);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// 9) 서버 시작 (ngrok 호환용 0.0.0.0 바인딩)
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server listening on http://0.0.0.0:${port}`);
});
