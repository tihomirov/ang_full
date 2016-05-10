'use strict';

import mongoose from 'mongoose';

var RootUserSchema = new mongoose.Schema({
  name: String,
  password: String
});

export default mongoose.model('RootUser', RootUserSchema);
