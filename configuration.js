exports.DB_URL = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/development';
exports.LOG_DIR = process.env.OPENSHIFT_LOG_DIR || __dirname + '/logs/';
exports.IP_ADDRESS =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
exports.PORT =  process.env.OPENSHIFT_NODEJS_PORT || 8080;
exports.SECRET_TOKEN = process.env.OPENSHIFT_SECRET_TOKEN || "magikarp";
exports.REGISTRATION_KEY = process.env.REGISTRATION_KEY || "123UseAMoreSecurePasswordHereOrFaceTheConsequences";
