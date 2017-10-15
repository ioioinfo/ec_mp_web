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
var eventproxy = require('eventproxy');
const util = require('util');
const uu_request = require('../utils/uu_request');

var host = "http://139.196.148.40:18003/";

var nav = function(server) {
    return {
        get_wx_by_openid: function(platform_id,openid,cb) {
            var url = host + "person/get_wx_by_openid?platform_id=" + platform_id + "&openid=" + openid;
            uu_request.do_get_method(url, function(err, content) {
                cb(err,content);
            });
        },

        save_wx: function(platform_id,openid,cb) {
            var url = host + "person/save_wx";
            var data = {platform_id:platform_id,openid:openid};
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
        
        bind_person_wx: function(platform_id,openid,person_id,cb) {
            var url = host + "person/bind_person_wx";
            var data = {platform_id:platform_id,openid:openid,person_id:person_id};
            uu_request.request(url, data, function(err, response, body) {
                cb(err,body);
            });
        },
    };
};

module.exports = nav;
