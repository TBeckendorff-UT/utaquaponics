var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ImageSchema = new Schema({
    "public_id": {type: String, required: true, index: { unique: true }},
    "version": {type: Number, required:true},
    "signature": {type: String, required:true},
    "width": {type: Number, required:true},
    "height": {type: Number, required:true},
    "format": {type: String, required:true},
    "resource_type": {type: String, required:true},
    "created_at": {type: Date, required:true},
    "bytes": {type: Number, required:true},
    "type": {type: String, required:true},
    "etag": {type: String, required:true},
    "url": {type: String, required:true},
    "secure_url": {type: String, required:true},
    "original_filename": {type: String, required:true},
    "tags": {type: Array},
    "system": {type: String, required:true},
    "semester": {type: String, required:true},
    "year": {type: Number, required:true}
});

module.exports = mongoose.model('Image', ImageSchema);