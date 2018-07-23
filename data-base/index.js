const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/angular6');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});


let Schema = mongoose.Schema; // Create a mongoose schema 


let userSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String }
})

userSchema = mongoose.model('userSchema', userSchema);

module.exports.userSchema = userSchema;
