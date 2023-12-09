const mongoose = require('mongoose');

const { Schema, model } = mongoose;

require('dotenv').config();

mongoose.connect("mongodb+srv://daniildudak2002:9e2U5QjbATh4o0PJ@cluster0.ibopecm.mongodb.net/", {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch((e) => {
    console.log(e, "error")
    console.log("Connection error");
    process.exit()
  });

  const Photo = new Schema({
    username: String,
    // total_sum: Number,
    payment_method: String
  });
  
  const PhotoModel = model('Photo', Photo);
  
  module.exports = {
    PhotoModel
  }