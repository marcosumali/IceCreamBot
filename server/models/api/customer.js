const mongoose = require('mongoose');

const genderRegex = /^Male$|^Female$/
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi

const customerSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  gender: {
    type: String,
    match: [genderRegex]
  },
  date_of_birth: {
    type: Date,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    match: [emailRegex]
  },
});

const Customer = mongoose.model('Customer', customerSchema);


module.exports = Customer;