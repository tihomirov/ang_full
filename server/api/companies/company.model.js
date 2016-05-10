'use strict';

import mongoose from 'mongoose';

var ComapnySchema = new mongoose.Schema({
  "name": String,
  "addressCompany": String,
  "companyMail": String,
  "yearFoundation": Date,
  "clients": [{ type : mongoose.Schema.ObjectId, ref: 'User' }]
});

export default mongoose.model('Company', ComapnySchema);
