// backend/test-connection.js
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connection successful');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  } finally {
    process.exit(0);
  }
})();
