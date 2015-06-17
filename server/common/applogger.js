var winston     = require ('winston'),
    path        = require ('path'),
    transports  = [];

transports.push(new winston.transports.DailyRotateFile({
    name: 'file',
    json: false,
    timestamp: true,
    colorize: true,
    datePattern: '.yyyy-MM-ddTHH',
    filename:  "log_file.log"
}));

var applogger = new winston.Logger({transports: transports});

//prints the request headers...
//applogger.printRequestIP = function(req) {
////    req.uidh  = req.header("x-uidh")===undefined?"-1": JSON.stringify(req.header("x-uidh"));
////    appLogger.infor(" uidh " + req.uidh + " ip: " + req.ip + " port " + req.connection.remotePort
////            + " phoneNumber : " + req.body.phoneNumber);

//}

/** Expose **/
//exports.printRequestIP = printRequestIP;

module.exports = applogger;
