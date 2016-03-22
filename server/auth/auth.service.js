'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';

import http from 'http';
import util from 'util';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

function updateWhitelist(host, data) {
  var options = {
    host: host,
    port: config.whitelist_port,
    path: '/whitelist.txt',
    method: 'PUT',
    headers: {
          'Content-Type': 'text/plain',
          'Content-Length': data.length
      }
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(data);
  req.end();
}

/**
 * Updates whitelists and attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          console.log("Authenticated user: " + util.inspect(user));
          req.user = user;
          user.activity.push({
            target: req.get('host'),
            ip: req.get('X-Real-IP'),
            date: Date.now()
          });
          user.save().then(function() {
            User.find({}).exec().then(function(users) {
              var whitelist = []
              users.forEach(function(user) {
                user.activity.forEach(function(activity) {
                  if (whitelist.indexOf(activity.ip) < 0) {
                    whitelist.push(activity.ip);
                  }

                });
              });
              var data = whitelist.join("\n");
              console.log("Current whitelist:\n" + data);
              updateWhitelist('base.flsw.io', data);

            });
          });
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}
