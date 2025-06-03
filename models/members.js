const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
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
