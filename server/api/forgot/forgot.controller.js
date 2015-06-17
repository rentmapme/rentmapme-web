'use strict';

var _ = require('lodash');


var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

var User = require('../user/user.model');

var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');


// Get list of forgots
exports.index = function(req, res) {

};

// Get a single forgot
exports.show = function(req, res) {

};

exports.create = function(req, res) {
console.log('create');
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          //req.flash('error', 'No account with that email address exists.');
          //return res.redirect('/forgot');
          res.send({'type': 'danger', 'msg':  'No account with that email address exists.'})
          return;
        } else {
          console.log('found user');
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function(err) {
            done(err, token, user);
          });
        }


      });
    },
    function(token, user, done) {
     console.log('sending email');
      var transporter = nodemailer.createTransport(ses({

        "accessKeyId": process.env.AWS_ACCESS_KEY,
        "secretAccessKey": process.env.AWS_SECRET_KEY,
        "region": "us-east-1"
        //accessKeyId: 'AWSACCESSKEY',
        //secretAccessKey: 'AWS/Secret/key'
      }));



      var mailOptions = {
        to: 'guptgaurav@gmail.com',
        from: 'guptgaurav@gmail.com',

        subject: 'RentMapMe Password Reset',


        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + process.env.DOMAIN + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function(err) {

        //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        if (!err) {
          res.send({'type': 'info', msg:  'An e-mail has been sent to ' + user.email + ' with further instructions.'})
        }
        console.log(err);
        //done(err, 'done');
      });
    }
  ], function(err) {
    console.log('error');
    if (err) return next(err);
    res.redirect('/forgot');
  });

}
function handleError(res, err) {
  return res.send(500, err);
}
