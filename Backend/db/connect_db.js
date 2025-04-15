require('dotenv').config();
const mongoose = require('mongoose');

const {
  ENV, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,
  DB_USER_ATLAS, DB_PASSWORD_ATLAS, DB_CLUSTER, DB_APP_NAME
} = process.env;

let uri;

if (ENV === 'prod'){
    uri = `mongodb+srv://${DB_USER_ATLAS}:${DB_PASSWORD_ATLAS}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APP_NAME}`;
}else{
    uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
}

const connectToDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log('✅ Connected to MongoDB\n'+uri);
    } catch (err) {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1); // Якщо не вдалось підключитись — завершити процес
    }
  };


module.exports = connectToDB; 