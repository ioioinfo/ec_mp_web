/**
 ┌──────────────────────────────────────────────────────────────┐
 │               ___ ___ ___ ___ ___ _  _ ___ ___               │
 │              |_ _/ _ \_ _/ _ \_ _| \| | __/ _ \              │
 │               | | (_) | | (_) | || .` | _| (_) |             │
 │              |___\___/___\___/___|_|\_|_| \___/              │
 │                                                              │
 │                                                              │
 │                       set up in 2015.2                       │
 │                                                              │
 │   committed to the intelligent transformation of the world   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
*/
 
var _ = require('lodash');
var r = require('request');
var moment = require('moment');
var eventproxy = require('eventproxy');

var moduel_prefix = 'ioio_ec_mp_web_seo';

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/robots.txt',
            handler: function(request, reply) {
                var robots = `User-agent: *\nAllow:`;
                
                return reply(robots);
            },
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};