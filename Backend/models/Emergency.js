const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    
});

const Emergency = mongoose.model('Emergency', emergencySchema);

module.exports = Emergency;