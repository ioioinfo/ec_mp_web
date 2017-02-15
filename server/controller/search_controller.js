// Base routes for item..
const uu_request = require('../utils/uu_request');
﻿var industries = require('../utils/industries.js');
var eventproxy = require('eventproxy');
var do_get_method = function(url,cb){
	uu_request.get(url, function(err, response, body){
		if (!err && response.statusCode === 200) {
			var content = JSON.parse(body);
			do_result(false, content, cb);
		} else {
			cb(true, null);
		}
	});
};
//所有post调用接口方法
var do_post_method = function(url,data,cb){
	uu_request.request(url, data, function(err, response, body) {
		console.log(body);
		if (!err && response.statusCode === 200) {
			do_result(false, body, cb);
		} else {
			cb(true,null);
		}
	});
};
//查找商品分类
var find_sorts = function(cb){
	var url = "http://127.0.0.1:8050/search_sorts";
	do_get_method(url,cb);
};
//cooke person
var get_cookie_person = function(request){
	var person_id;
	if (request.state && request.state.cookie) {
		state = request.state.cookie;
		if (state.person_id_mb) {
			person_id = state.person_id_mb;
		}
	}
	return person_id;
};
//收藏
var find_favorite = function(product_id,person_id,cb){
	var url = "http://139.196.148.40:18003/favorite/get_by_person_and_product?product_id=";
	url = url + product_id +"&person_id=" + person_id;
	do_get_method(url,cb);
};
//查询商品信息
var find_product_info = function(id,cb){
	var url = "http://127.0.0.1:8080/mp_product_info?product_id="+id;
	do_get_method(url,cb);
};
//处理结果
var do_result = function(err,result,cb){
	if (!err) {
		if (result.success) {
			cb(false,result);
		}else {
			cb(true,result);
		}
	}else {
		cb(true,null);
	}
};
//更新收藏
var update_favorite = function(data,cb){
	var url = "http://139.196.148.40:18003/favorite/save_favorite";
	do_post_method(url,data,cb);
};
//根据personid找头像
var find_persons = function(persons, cb){
	var platform_id = "ec_shopping";
	var url = "http://139.196.148.40:18003/get_person_avatar?person_ids=";
	url = url + persons + "&scope_code=" +platform_id;
	do_get_method(url,cb);
};
//根据personid找vip
var find_personsVip = function(persons, cb){
	var platform_id = "ec_shopping"
	var url = "http://139.196.148.40:18003/vip/list_by_scope_persons?person_ids=";
	url = url + persons + "&scope_code=" +platform_id;
	do_get_method(url,cb);
};
//得到所有订单
var get_ec_orders = function(cb){
	var url = "http://127.0.0.1:18010/get_ec_orders";
	do_get_method(url,cb);
};
//得到单个订单
var get_ec_order = function(order_id,cb){
	var url = "http://127.0.0.1:18010/get_ec_order?order_id="+order_id;
	do_get_method(url,cb);
};
//得到个人地址信息
var get_order_address = function(person_id,cb){
	var url = "http://127.0.0.1:18010/search_order_address?person_id="+person_id;
	do_get_method(url,cb);
};
//查询物流信息
var get_logistics_info = function(order_id,cb){
	var url = "http://127.0.0.1:18010/search_laster_logistics?order_id="+order_id;
	do_get_method(url,cb);
};
//
var get_logistics_infos = function(order_id,cb){
	var url = "http://127.0.0.1:18010/search_logistics_info?order_id="+order_id;
	do_get_method(url,cb);
};
exports.register = function(server, options, next){
	server.route([
		//desc,需要服务器地址
		{
			method: 'GET',
			path: '/desc',
			handler: function(request, reply){
				return reply({"success":"ok","server":"ec_search server, ec_interaction server, ec_shopping_cart server"});
			}
		},
		//分类
		{
			method: 'GET',
			path: '/sort',
			handler: function(request, reply){
				find_sorts(function(err, content){
					if (!err) {
						var  sorts = content.rows;
						console.log("sorts: "+sorts);
						var level_map = {};
						for (var i = 0; i < sorts.length; i++) {
							var parent_id = sorts[i].parent.toString() ;
							var level_sorts = [];
							if (level_map[parent_id]) {
								level_sorts = level_map[parent_id];
							}
							level_sorts.push(sorts[i]);
							level_map[parent_id] = level_sorts;
						}
						console.log("level_map: "+JSON.stringify(level_map));
						var sorts_infos = JSON.stringify(level_map);
						return reply.view("sort",{"sorts":level_map,"sorts_infos":sorts_infos});
					}else {
					}
				});
			}
		},
		//查询
		{
			method: 'GET',
			path: '/search',
			handler: function(request, reply){
				return reply.view("search");
			}
		},
		//查询搜索
		{
			method: 'GET',
			path: '/search_area',
			handler: function(request, reply){
				return reply.view("search_area");
			}
		},
		//产品展示
		{
			method: 'GET',
			path: '/product_show',
			handler: function(request, reply){
				var product_id = request.query.product_id;
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var is_active = 0;
				find_product_info(product_id, function(err, content){
					if (!err) {
						var industry_id = content.product.industry_id;
						var industry = industries[industry_id];
						find_favorite(product_id,person_id,function(err,result){
							if (!err) {
								if (result.row && result.row.is_active) {
									is_active = result.row.is_active;
								}
								return reply.view(industry.view_name,{"product":content.product,"is_active":is_active});
							}else {

							}
						});
					}else {
					}
				});
				// return reply.view("product_show");
			}
		},
		//产品图文参数
		{
			method: 'GET',
			path: '/product_text_configure',
			handler: function(request, reply){
				return reply.view("product_text_configure");
			}
		},
		//产品评论
		{
			method: 'GET',
			path: '/product_comment',
			handler: function(request, reply){
				return reply.view("product_comment");
			}
		},
		//去评价
		{
			method: 'GET',
			path: '/go_comment',
			handler: function(request, reply){
				return reply.view("go_comment");
			}
		},
		//修改收藏
		{
			method: 'POST',
			path: '/update_favorite',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var is_active = 0
				if (request.payload.is_active == 0) {
					var is_active = 1;
				}
				var data = {
					person_id :person_id,
					product_id : request.payload.product_id,
					is_active : is_active
				};
				update_favorite(data,function(err,result){
					if (!err) {
						return reply({"success":true});
					}else {
							return reply({"success":false});
					}
				});
			}
		},

		//购物车
		{
			method: 'GET',
			path: '/shopping_cart',
			handler: function(request, reply){
				return reply.view("shopping_cart");
			}
		},
		//订单
		{
			method: 'GET',
			path: '/order_pay',
			handler: function(request, reply){
				return reply.view("order_pay");
			}
		},
		//个人中心
		{
			method: 'GET',
			path: '/person_center',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var ep =  eventproxy.create("persons","personsVip",
					function(persons,personsVip){
					return reply.view("person_center",{"success":true,"persons":persons,"personsVip":personsVip});
				});
				find_persons(person_id, function(err, content){
					if (!err) {
						var persons = content.rows;
						ep.emit("persons", persons);
					}else {
						ep.emit("persons", []);
					}
				});
				find_personsVip(person_id, function(err, content){
					if (!err) {
						var personsVip = content.rows;
						ep.emit("personsVip", personsVip);
					}else {
						ep.emit("personsVip", []);
					}
				});
			}
		},
		//退出loginout
		{
			method: 'GET',
			path: '/logout',
			handler: function(request, reply){
				return reply({"success":true}).state('cookie', {});
			}
		},
		//个人设置
		{
			method: 'GET',
			path: '/configure',
			handler: function(request, reply){
				return reply.view("configure");
			}
		},
		//订单中心
		{
			method: 'GET',
			path: '/order_center',
			handler: function(request, reply){
				get_ec_orders(function(err,results){
					if (!err) {
						if (true) {
							return reply.view("order_center",{"orders":results.orders,"details":results.details,"products":results.products});
						}
					}else {

					}
				});
			}
		},
		//查看物流
		{
			method: 'GET',
			path: '/check_logistics',
			handler: function(request, reply){
				var order_id = request.query.order_id;
				get_logistics_infos(order_id, function(err,results){
					if (!err) {
						return reply.view("check_logistics",{"logistics_infos":results.rows,"order_logistics":results.order_logistics});
					}else {

					}
				});
			}
		},
		//地址管理
		{
			method: 'GET',
			path: '/address_management',
			handler: function(request, reply){
				return reply.view("address_management");
			}
		},
		//新增地址
		{
			method: 'GET',
			path: '/add_address',
			handler: function(request, reply){
				return reply.view("add_address");
			}
		},
		//编辑地址
		{
			method: 'GET',
			path: '/edit_address',
			handler: function(request, reply){
				return reply.view("edit_address");
			}
		},
		//收藏
		{
			method: 'GET',
			path: '/favorite_list',
			handler: function(request, reply){
				return reply.view("favorite_list");
			}
		},
		//代付款
		{
			method: 'GET',
			path: '/pre_pay',
			handler: function(request, reply){
				return reply.view("pre_pay");
			}
		},
		//代发货
		{
			method: 'GET',
			path: '/pre_send',
			handler: function(request, reply){
				return reply.view("pre_send");
			}
		},
		//代收货
		{
			method: 'GET',
			path: '/pre_receive',
			handler: function(request, reply){
				return reply.view("pre_receive");
			}
		},
		//待评价
		{
			method: 'GET',
			path: '/pre_comment',
			handler: function(request, reply){
				return reply.view("pre_comment");
			}
		},
		//售后
		{
			method: 'GET',
			path: '/after_sale',
			handler: function(request, reply){
				return reply.view("after_sale");
			}
		},
		//订单详情
		{
			method: 'GET',
			path: '/order_detail',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var order_id = request.query.order_id;

				var ep =  eventproxy.create("order","details","products","order_address","logistics_info",
					function(order,details,products,order_address,logistics_info){
					return reply.view("order_detail",{"order":order,"order_address":order_address,"details":details,"products":products,"logistics_info":logistics_info});
				});

				get_ec_order(order_id,function(err,results){
					if (!err) {
						if (true) {
							ep.emit("order", results.orders[0]);
							ep.emit("details", results.details);
							ep.emit("products", results.products);
						}
					}else {
						ep.emit("order", {});
						ep.emit("details", {});
						ep.emit("products", {});
					}
				});

				get_order_address(person_id,function(err,results){
					if (!err) {
						if (true) {
							ep.emit("order_address", results.address[0]);
						}
					}else {
						ep.emit("order", {});
					}
				});
				get_logistics_info(order_id,function(err,results){
					if (!err) {
						if (true) {
							ep.emit("logistics_info", results.row);
						}
					}else {
						ep.emit("logistics_info", {});
					}
				});
			}
		},
		//微信注册
		{
			method: 'GET',
			path: '/chat_register',
			handler: function(request, reply){
				return reply.view("chat_register");
			}
		},
		//微信注册存在
		{
			method: 'GET',
			path: '/exist_register',
			handler: function(request, reply){
				return reply.view("exist_register");
			}
		},
		//新账号设置密码
		{
			method: 'GET',
			path: '/set_password',
			handler: function(request, reply){
				return reply.view("set_password");
			}
		},
		//微信账号登入
		{
			method: 'GET',
			path: '/chat_login',
			handler: function(request, reply){
				return reply.view("chat_login");
			}
		},
		//微信个人中心
		{
			method: 'GET',
			path: '/chat_person_center',
			handler: function(request, reply){
				return reply.view("chat_person_center");
			}
		},
		//微信充值中心
		{
			method: 'GET',
			path: '/chongzhi_center',
			handler: function(request, reply){
				return reply.view("chongzhi_center");
			}
		},
		//微信小票
		{
			method: 'GET',
			path: '/chat_receipt',
			handler: function(request, reply){
				return reply.view("chat_receipt");
			}
		},



    ]);

    next();
};

exports.register.attributes = {
    name: 'search_result'
};
