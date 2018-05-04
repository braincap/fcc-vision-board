const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
  title: { type: String, minlength: 0 },
  inputImageURL: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tags: [String]
});

mongoose.model('cards', cardSchema);
