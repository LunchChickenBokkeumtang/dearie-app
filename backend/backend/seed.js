// backend/seed.js
require('dotenv').config();
const mongoose     = require('mongoose');
const Notification = require('./models/Notification');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🔗 MongoDB connected for seeding');

  const samples = [
    {
      userId:  'testUser',
      type:    'ASEPA',
      title:   '📺 새 미디어 : AESPA [Dirty Work] Choreography Video 공개',
      message: '새로운 AESPA 댄스 영상이 등록되었습니다!',

      payload: {
        imageUrl: '/media/aespa-dirty-work.png'
      }
    },
    {
      userId:  'testUser',
      type:    'TXT',
      title:   'TXT입니다',
      message: 'TXT',
      payload: {}
    },
    {
      userId:  'testUser',
      type:    'ALL',
      title:   'ALL입니다',
      message: 'ALL',
      payload: {}
    },
  ];

  for (const sample of samples) {
    const res = await Notification.updateOne(
      { userId: sample.userId, type: sample.type },
      { 
        $set: { 
          title:   sample.title, 
          message: sample.message, 
          payload: sample.payload 
        } 
      },
      { upsert: true }
    );
    console.log(`↻ Upserted ${sample.type}:`, res.upsertedId ? 'inserted' : 'updated');
  }

  console.log(`✅ Seed completed (upsert ${samples.length} docs)`);
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
