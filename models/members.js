const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
    phone: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    }
  
});


module.exports = mongoose.model('members', memberSchema);
