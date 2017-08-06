var mongoose = require('mongoose');
Schema = mongoose.Schema;

var SensorSchema = new Schema({
    "sensor_name": {type: String, required: true, unique: true, lowercase: true},
    "reading_measurement": {type: String, required: true},
    "reading_units": {type: String, required: true},
    "serial_number": {type: String, required: true},
    "description": {type: String, required:true},
    "title": {type: String, required:true},
    "last_reading": {type: Date, required:true}
});

module.exports = mongoose.model('Sensor', SensorSchema);
