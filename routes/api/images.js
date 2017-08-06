var express = require('express'),
    router = express.Router(),
    logger = require('../../logger'),
    REST = require('../../models/api/rest'),
    tokenHandler = require('../../models/api/tokenHandler'),
    formidable = require('formidable'),
    Image = require('../../models/db/image'),
    cloudinary = require('cloudinary');

var cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_ID,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
};

var ROUTE = 'images';
var LOG_TAG = {tag: ROUTE};

/**
 * @api {get} /api/images Request the Last Hundred Images.
 * @apiName GetImages
 * @apiGroup Images
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Image[]} response.data An array of up to the last hundred images.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.get('/', function(req, res) {
    var images = getLastHundredImages();
    logger.info('Sending the images returned by MongoDB', LOG_TAG);
    res.json(REST.REQUEST_PROCESSED(ROUTE, images || []));
});

/**
 * @api {post} /api/images Submit an Image.
 * @apiName PostImages
 * @apiGroup Images
 * @apiPermission admin
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Image} response.data The saved image.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.post('/', function(req, res) {
    tokenHandler.validJSONWebToken(req.session, function(valid) {
        if (valid) {
            logger.log('debug', 'Processing the request form.', LOG_TAG);
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                setCloudinaryConfig(cloudinaryConfig);
                logger.info('Uploading the image to Cloudinary', LOG_TAG);
                cloudinary.uploader.upload(files.file.path, function (image) {
                    var imageSchema = generateImageSchema(fields, image);
                    var savedImage = saveImage(imageSchema);
                    if (savedImage != null) {
                        logger.info('Sending the meta data for the image saved.', LOG_TAG);
                        res.json(REST.IMAGE_SAVED(ROUTE, savedImage));
                    } else {
                        logger.log('warn', 'Sending an invalid image error', LOG_TAG);
                        res.json(REST.INVALID_IMAGE(ROUTE));
                    }
                });
            });
        } else {
                logger.log('warn', 'Sending an invalid token error', LOG_TAG);
                res.json(REST.INVALID_TOKEN(ROUTE));
        }
    });
});

/**
 * @api {post} /api/images/search Search for Images
 * @apiName SearchImages
 * @apiGroup Images
 * @apiPermission admin
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Image[]} response.data An array of images that match the provided parameters.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.post('/search', function(req, res) {
    logger.info('Received POST request for /images/search', LOG_TAG);
    logger.log('debug', req, LOG_TAG);
    logger.log('debug', 'Processing the request form.', LOG_TAG);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        logger.log('debug', 'Generating a search query from the request form', LOG_TAG);
        var query = {};
        var tags = fields.tags;
        var semester = fields.semester;
        var system = fields.system;
        var year = fields.year;
        var useTags = tags !== '';
        var useSemester = (semester === 'fall' || semester === 'spring');
        var useSystem = (system === 'media bed' || system === 'floating raft');
        if (useTags && useSemester && useSystem) {
            query = Image.find({$and: [{tags: {$all: tags}}, {semester: semester}, {system: system}, {year: year}]}).limit(50);
        } else if (useTags && useSemester) {
            query = Image.find({$and: [{tags: {$all: tags}}, {semester: semester}, {year: year}]}).limit(50);
        } else if (useTags && useSystem) {
            query = Image.find({$and: [{tags: {$all: tags}}, {system: system}, {year: year}]}).limit(50);
        } else if (useTags) {
            query = Image.find({$and: [{tags: {$all: tags}}, {year: year}]}).limit(50);
        } else if (useSemester) {
            query = Image.find({$and: [{semester: semester}, {year: year}]}).limit(50);
        } else if (useSystem) {
            query = Image.find({$and: [{system: system}, {year: year}]}).limit(50);
        } else if (useSemester && useSystem) {
            query = Image.find({$and: [{semester: semester}, {system: system}, {year: year}]}).limit(50);
        } else {
            query = Image.find({$and: [{year: year}]}).limit(50);
        }
        query.exec(function(err, images) {
            if (err) {
                logger.log('warn', 'Sending an internal error', LOG_TAG);
                res.json(REST.INTERNAL_ERROR(ROUTE));
            } else {
                logger.info('Sending the images returned by MongoDB');
                res.json(REST.REQUEST_PROCESSED(ROUTE, images || []));
            }
        })
    });
});

/**
 * @api {get} /api/images/date/:date Request Images By Date.
 * @apiName GetImagesWithDate
 * @apiGroup Images
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Images[]} response.data An array of images that match the given date.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.get('/date/:date', function(req, res) {
    if (req.params.date != null) {
        var date = req.params.date;
        var images = getImagesByDate(date);
        logger.log('Sending the images returned by MongoDB', LOG_TAG);
        res.json(REST.REQUEST_PROCESSED(ROUTE, images || []));
    }
});

/**
 * @api {get} /api/images/tag/:tag Request Images By Tag.
 * @apiName GetImagesWithTag
 * @apiGroup Images
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Image[]} response.data An array of images that match the given tag.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.get('/tag/:tag', function(req, res) {
    if (req.params.tag != null) {
        var tag = req.params.tag;
        var images = getImagesByTag(tag);
        logger.info('Sending the images returned by MongoDB', LOG_TAG);
        res.json(REST.REQUEST_PROCESSED(ROUTE, images || []));
    }
});

/**
 * @api {get} /api/images/count Request the Count of Images
 * @apiName GetCountOfImages
 * @apiGroup Images
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Number} response.data The count of all images stored.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.get('/count', function(req, res) {
    var count = countImages();
    logger.info('Sending the count of images returned by MongoDB', LOG_TAG);
    res.json(REST.REQUEST_PROCESSED(ROUTE, count || 0));
});

/**
 * @api {get} /api/images/image/:id Request Image By ID
 * @apiName GetImage
 * @apiGroup Images
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Image} response.data An image with the given ID.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.get('/image/:id', function(req, res) {
    if (req.params.id != null) {
        var imageID = req.params.id;
        var image = getImageByID(imageID);
        if (image != null) {
            logger.info('Sending the image returned by MongoDB', LOG_TAG);
            return res.json(REST.REQUEST_PROCESSED(ROUTE, image));
        } else {
            logger.log('warn', 'Sending an image does not exist error', LOG_TAG);
            return res.json(REST.IMAGE_DOES_NOT_EXIST(ROUTE));
        }
    } else {
        logger.log('warn', 'Sending an invalid image error', LOG_TAG);
        return res.json(REST.INVALID_IMAGE(ROUTE));
    }
});

/**
 * @api {put} /api/images/image/:id Update an Image
 * @apiName UpdateImage
 * @apiGroup Images
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Image} response.data The updated image.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.put('/image/:id', function(req, res) {
    if (req.params.id != null) {
        var imageID = req.params.id;
        if (tokenHandler.validJSONWebToken(req.session)) {
            var image = getImageByID(imageID);
            if (image != null) {
                var updatedFields = getUpdatedImageFields();
                var updatedImage = updateImage(image, updatedFields);
                if (updatedImage != null) {
                    logger.info('Sending the image updated in MongoDB', LOG_TAG);
                    return res.json(REST.IMAGE_UPDATED(ROUTE,updatedImage));
                } else {
                    logger.log('warn', 'Sending an internal error', LOG_TAG);
                    return res.json(REST.INTERNAL_ERROR(ROUTE));
                }
            } else {
                logger.log('warn', 'Sending an image does not exist error', LOG_TAG);
                res.json(REST.IMAGE_DOES_NOT_EXIST(ROUTE));
            }
        } else {
            logger.log('warn', 'Sending an invalid token error', LOG_TAG);
            res.json(REST.INVALID_TOKEN(ROUTE));
        }
    } else {
        logger.log('warn', 'Sending an invalid image error', LOG_TAG);
        return res.json(REST.INVALID_IMAGE(ROUTE));
    }
});

/**
 * @api {delete} /api/images/image/:id Delete an Image
 * @apiName DeleteImage
 * @apiGroup Images
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Image} response.data The deleted image
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.delete('/image/:id', function(req, res) {
    if (req.params.id != null) {
        var imageID = req.params.id;
        if (tokenHandler.validJSONWebToken(req.session)) {
            var image = removeImage(imageID);
            if (image != null) {
                logger.info('Sending the image removed from MongoDB', LOG_TAG);
                res.json(REST.IMAGE_REMOVED(ROUTE, image));
            } else {
                logger.log('warn', 'Sending an internal error', LOG_TAG);
                res.json(REST.INTERNAL_ERROR(ROUTE));
            }
        } else {
            logger.log('warn', 'Sending an invalid token error', LOG_TAG);
            res.json(REST.INVALID_TOKEN(ROUTE));
        }
    } else {
        logger.log('warn', 'Sending an invalid image error', LOG_TAG);
        return res.json(REST.INVALID_IMAGE(ROUTE));
    }
});

function saveImage(imageSchema) {
    imageSchema.save(function(err, image) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            logger.log('Image saved', LOG_TAG);
            return image;
        }
    });
}

function setCloudinaryConfig(cloudinaryConfig) {
    logger.info('Setting Cloudinary Configurations', LOG_TAG);
    logger.log('debug', cloudinaryConfig, LOG_TAG);
    cloudinary.config(cloudinaryConfig);
}

function generateImageSchema(fields, image) {
    logger.info('Generating Image Schema', LOG_TAG);
    logger.log('debug', fields, LOG_TAG);
    var imageSchema = new Image({
        "public_id": image.public_id,
        "version": image.version,
        "signature": image.signature,
        "width": image.width,
        "height": image.height,
        "format": image.format,
        "resource_type": image.resource_type,
        "created_at": image.created_at,
        "bytes": image.bytes,
        "type": image.type,
        "etag": image.etag,
        "url": image.url,
        "secure_url": image.secure_url,
        "original_filename": image.original_filename,
        "tags": fields.tags.split(' '),
        "system": fields.system,
        "semester": fields.semester,
        "year": fields.year
    });
    logger.log('debug', imageSchema, LOG_TAG);
    return imageSchema;
}

function getLastHundredImages() {
    logger.info('Searching MongoDB for the last hundred images', LOG_TAG);
    var query = Image.find({}).sort({$natural: -1}).limit(100);
    query.exec(function(err, images) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            logger.info('Search for last hundred images complete', LOG_TAG);
            logger.log('debug', images, LOG_TAG);
            return images;
        }
    });
}

function getImagesByDate(date) {
    logger.info('Searching MongoDB for images with the given date', LOG_TAG);
    logger.log('debug', date, LOG_TAG);
    Image.find({date: date}, function(err, images) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            logger.log('debug', images, LOG_TAG);
            return images;
        }
    });
}

function getImagesByTag(tag) {
    logger.info('Searching MongoDB for images with the given tag', LOG_TAG);
    logger.log('debug', tag, LOG_TAG);
    Image.find({tags: {$all: [tag]}}, function(err, images) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            logger.log('debug', images, LOG_TAG);
            return images;
        }
    });
}

function countImages() {
    logger.info('Searching MongoDB for the count of all images stored', LOG_TAG);
    Image.count(function (err, count) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            logger.log('debug', count, LOG_TAG);
            return count;
        }
    });
}

function getImageByID(imageID) {
    logger.info('Searching MongoDB for an image with the given ID', LOG_TAG);
    logger.log('debug', imageID, LOG_TAG);
    Image.findOne({id: imageID}, function (err, image) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            logger.log('debug', image, LOG_TAG);
            return image;
        }
    });
}

function getUpdatedImageFields() {
    logger.log('debug', 'Getting updated image fields', LOG_TAG);
    logger.log('debug', 'Processing the request form.', LOG_TAG);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            var updatedFields = {};
            updatedFields.tags = fields.tags || undefined;
            updatedFields.system = fields.system || undefined;
            updatedFields.semester = fields.semester || undefined;
            updatedFields.year = fields.year || undefined;
            logger.log('debug', updatedFields, LOG_TAG);
            return updatedFields;
        }
    });
}

function updateImage(image, updatedFields) {
    logger.info('Updating the given image in MongoDB', LOG_TAG);
    logger.log('debug', image, LOG_TAG);
    logger.log('debug', updatedFields, LOG_TAG);
    var updatedImage = bindUpdatedFields(image, updatedFields);
    updatedImage.save(function(err, image) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            logger.log('debug', image, LOG_TAG);
            return image;
        }
    });
}

function bindUpdatedFields(image, updatedFields) {
    logger.log('debug', 'Binding the updatedFields to the given image', LOG_TAG);
    Object.keys(updatedFields).forEach(function(key, index) {
        image[key] = updatedFields[index];
    });
    logger.log('debug', image, LOG_TAG);
    return image;
}

function removeImage(imageID) {
    logger.info('Removing the given image from MongoDB', LOG_TAG);
    Image.findByIdAndRemove(imageID, function(err, image) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            return null;
        }
        else {
            logger.log('debug', image, LOG_TAG);
            return image;
        }
    });
}

module.exports = router;