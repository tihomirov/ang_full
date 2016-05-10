'use strict';

import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthDay: Date,
  type: String,
  mail: String,
  company: {_id: mongoose.Schema.ObjectId}
});

export default mongoose.model('User', UserSchema);
