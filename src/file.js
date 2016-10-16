/**
 * @author Vu Truong
 */

var fs = require('fs');
var path = require('path');
var config = require('../config');
var lwip = require('lwip');

var methods = {};

methods.saveToS3 = function(fileStream, callback) {

};

methods.saveToLocal = function(file, callback) {
    var dirPath = path.join(__dirname, '../public/images');
    var now = Date.now();
    var fileName = now + '_' + file.originalFilename;
    fs.renameSync(file.path, path.join(dirPath, fileName));
    var filePath = config.hostName + ':' + config.port + '/images/' + fileName;
    var fileInfor = {};
    fileInfor.title = file.originalFilename;
    fileInfor.path = filePath;
    fileInfor.type = (file.headers && file.headers['content-type']) || 'image';
    fileInfor.size = file.size;
    lwip.open(path.join(dirPath, fileName), function(err, image) {
        if (err) {
            return callback(err);
        }
        // manipulate image
        image.batch()
        .scale(0.25) // scale to 25%
        .writeFile(path.join(dirPath,'thumbnail', fileName), function(err) {
            if (!err) {
                fileInfor.thumbnail = config.hostName + ':' + config.port + '/images/thumbnail/' + now + '_' + file.originalFilename;
                return callback(null, fileInfor);
            }

            return callback(err);
        });
    });
};

methods.deleteFile = function(filePath, callback) {
    if (!filePath) return;
    var filePathArray = filePath.split('/');
    filePathArray = filePathArray[filePathArray.length - 1];
    var url = path.join(__dirname, '../public/images', filePathArray);
    var thumbnailUrl = path.join(__dirname, '../public/images/thumbnail', filePathArray);
    // Check file minified exists
    if (fs.existsSync(thumbnailUrl)) {
        fs.unlinkSync(thumbnailUrl);
    }
    // Check file exists
    if (!fs.existsSync(url)) return;
    return fs.unlinkSync(url);
};

module.exports = methods;
