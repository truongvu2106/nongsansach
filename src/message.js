var nodemailer = require('nodemailer');
var methods = {};

methods.sendMessage = function(options, callback) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rainbow.n.hope@gmail.com',
            pass: 'rainbow.n.hoperainbow.n.hope'
        }
    });
    options.from = 'no-reply@gmail.com';
    options.subject = options.subject || '[vuapp] No Reply Message';
    transporter.sendMail(options, callback);
};

module.exports = methods;
