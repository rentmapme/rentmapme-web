'use strict';

var _ = require('lodash');
//var Reset = require('./reset.model');
var async = require('async');
var crypto = require('crypto');

var User = require('../user/user.model');

var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');


//// Get list of resets
//exports.index = function(req, res) {
//  Reset.find(function (err, resets) {
//    if(err) { return handleError(res, err); }
//    return res.json(200, resets);
//  });
//};

// Get a single reset
exports.show = function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      res.send({'type': 'danger', 'msg':  'Password token has expired. Change Password', link: '/forgot-password'})
      return;
      //res.redirect('/forgot');
    }
    else {
      res.send({'type': 'success', 'msg':  'Render form'})
    }

    //res.render('reset', {
    //  user: req.user
    //});
  });
};

// Creates a new reset in the DB.
exports.create = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          console.log('user is not found!!!');
          res.send({'type': 'danger', 'msg':  'Password token has expired. Change Password', link: '/forgot-password'})
          return;
        } else {
          console.log('user found!!!');
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function(err) {
            console.log('user saved');
            done(err, user);
            //req.logIn(user, function(err) {
            //  done(err, user);
            //});
          });
        }


      });
    },
    function(user, done) {
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
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {

        //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        if (!err) {
          res.send({'type': 'info', msg:  'Your password has been successfully reset. Proceed to login page' , link: '/login' })
        }
        //done(err, 'done');
      });
    }
  ], function(err) {
    console.log('error');
    if (err) return next(err);
    res.redirect('/forgot');
  });
};

// Updates an existing reset in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reset.findById(req.params.id, function (err, reset) {
    if (err) { return handleError(res, err); }
    if(!reset) { return res.send(404); }
    var updated = _.merge(reset, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reset);
    });
  });
};

// Deletes a reset from the DB.
exports.destroy = function(req, res) {
  Reset.findById(req.params.id, function (err, reset) {
    if(err) { return handleError(res, err); }
    if(!reset) { return res.send(404); }
    reset.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
