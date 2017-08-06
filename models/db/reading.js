var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ReadingSchema = new Schema({
    "timestamp":{type: Date, required:true},
    "sensor_id": {type: String, required: true},
    "value": {type: Number, required: true}
});

module.exports = mongoose.model('Reading', ReadingSchema);