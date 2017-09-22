var _ = require('lodash');
var crypto = require('crypto');

const wx_reply = require('../utils/wx_reply');

//静态页面 帮助控制器
exports.register = function(server, options, next){
  var wx_api = server.plugins.services.wx_api;

  //签名验证
  var check_signature = function(signature,token,timestamp,nonce) {
      var shasum = crypto.createHash('sha1');
      arr = [token,timestamp,nonce].sort();
      shasum.update(arr.join(''));

      return shasum.digest('hex') === signature;
  };

	server.route([
		{
			method: 'GET',
			path: '/MP_verify_w1I7DjMg5OPL8Of2.txt',
			handler: function(request, reply){
				return reply("w1I7DjMg5OPL8Of2");
			}
		},

    {
        method: 'GET',
        path: '/wechat',
        handler: function(request, reply) {
            var echostr = request.query.echostr;
            var signature = request.query.signature;
            var timestamp = request.query.timestamp;
            var nonce = request.query.nonce;
            var token = "uuinfo";

            var check = check_signature(signature,token,timestamp,nonce);

            if (check) {
                return reply(echostr);
            } else {
                return reply("入口错误");
            }
        },
    },

    {
        method: 'POST',
        path: '/wechat',
        handler: function(request, reply) {
            var body = request.payload;

            wx_reply.process_xml(body, function(xml,msg_type,openid,resp) {
                if (msg_type == "text") {
                    var content = xml.Content[0];

                    if (content == "openid") {
                      return reply(resp.text({content:openid}));
                    }

                    return reply(resp.text({content:"你好"}));
                } else {
                  return reply(resp.text({content:"你好"}));
                }
            });
        }
    },

    //授权页面跳转
    {
        method: 'GET',
        path: '/go2auth/{key}',
        handler: function(request, reply) {
            var path = request.params.key;
            if (!path) {
              return reply("param path is null");
            }

            path = encodeURIComponent(path+request.url.search);

            var host = "http://shop.buy42.com/";
            var platform_id = "shantao_dingyue";

            wx_api.get_go2auth_url(platform_id,host,path,function(err,body) {
                return reply.redirect(body.url);
            });
        }
    },

  ]);

    next();
};

exports.register.attributes = {
    name: 'wx_controller'
};
