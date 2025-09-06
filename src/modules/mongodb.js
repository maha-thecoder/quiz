const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MANGO_URI;

const mangodb = async () => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('❌ Mongoose connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { mangodb };
