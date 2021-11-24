const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const Store = mongoose.model('Store', storeSchema);


module.exports = Store;