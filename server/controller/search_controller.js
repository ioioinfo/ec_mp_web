// Base routes for item..
const uu_request = require('../utils/uu_request');
﻿var industries = require('../utils/industries.js');
var eventproxy = require('eventproxy');
const uuidV1 = require('uuid/v1');
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
//cooke cart_code
var get_cookie_cart_code = function(request){
	var cart_code;
	if (request.state && request.state.cookie) {
		state = request.state.cookie;
		if (state.cart_code) {
			cart_code = state.cart_code;
		}
	}
	return cart_code;
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
//所有物流信息
var get_logistics_infos = function(order_id,cb){
	var url = "http://127.0.0.1:18010/search_logistics_info?order_id="+order_id;
	do_get_method(url,cb);
};
//查询个人地址
var search_person_address = function(person_id,cb){
	var url = "http://139.196.148.40:18003/address/list_by_person?person_id="+person_id;
	do_get_method(url,cb);
};
//产品id找评论
var find_comments_info = function(product_id, cb){
	var url = "http://127.0.0.1:8060/comments_show?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
};
//根据id找到追评
var find_again_comments = function(product_id, cb){
	var url = "http://127.0.0.1:8060/again_comments?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
}
//根据评论找晒单
var find_saidans_pictures = function(comments_ids, cb){
	var url = "http://127.0.0.1:8060/comments_saidan?comments_ids=";
	url = url + comments_ids;
	do_get_method(url,cb);
};
//好评，差评，总数
var find_total_comments = function(product_id, cb){
	var url = "http://139.196.148.40:16001/get_product_comments_summary?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
};
//根据personid找头像
var find_comments_persons = function(person_id, cb){
	var platform_id = "ec_shopping";
	var url = "http://139.196.148.40:18003/get_person_avatar?person_ids=";
	url = url + person_id + "&scope_code=" +platform_id;
	do_get_method(url,cb);
};
//根据personid找vip
var find_comments_personsVip = function(comments_persons, cb){
	var platform_id = "ec_shopping"
	var url = "http://139.196.148.40:18003/vip/list_by_scope_persons?person_ids=";
	url = url + comments_persons + "&scope_code=" +platform_id;
	do_get_method(url,cb);
};
//通过商品id查找到商品
var find_properties_by_product = function(product_id, cb){
	var url = "http://127.0.0.1:18002/find_properties_by_product?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
};
//收货操作
var receive_goods_operations = function(order_id,cb){
	var url = "http://127.0.0.1:18010/receive_goods_operations?order_id=";
	url = url + order_id;
	do_get_method(url,cb);
};
//更新默认地址
var update_default_address = function(data,cb){
	var url = "http://139.196.148.40:18003/address/set_default_address";
	do_post_method(url,data,cb);
};
//删除地址
var delete_address = function(data,cb){
	var url = "http://139.196.148.40:18003/address/delete_address";
	do_post_method(url,data,cb);
};
//新增/修改地址
var save_address = function(data,cb){
	var url = "http://139.196.148.40:18003/address/save_address";
	do_post_method(url,data,cb);
};
//查询地址
var search_address = function(address_id,person_id,cb){
	var url = "http://139.196.148.40:18003/address/get_by_id?address_id=";
	url = url + address_id + "&person_id=" + person_id;
	do_get_method(url,cb);
};
//收藏查询
var search_favorite_list = function(person_id,cb){
	var url = "http://139.196.148.40:18003/favorite/list_by_person?person_id=";
	url = url + person_id;
	do_get_method(url,cb);
};
//查询产品信息
var search_products_list = function(product_ids,cb){
	var url = "http://127.0.0.1:18002/find_products_with_picture?product_ids=";
	url = url + product_ids;
	do_get_method(url,cb);
};
//开票信息
var get_invoice_info = function(person_id,order_ids,cb){
	var url = "http://127.0.0.1:18010/search_ec_invoices?order_id=";
	url = url + order_ids + "&person_id=" + person_id;
	do_get_method(url,cb);
};
//新建无人购物车
var new_mb_shopping_cart = function(data,cb){
	var url = "http://127.0.0.1:8030/new_none_person_cart";
	do_post_method(url,data,cb);
};
//是否存在cart_code
var search_cart_code = function(data,cb){
	var url = "http://127.0.0.1:8030/search_cart_code";
	do_post_method(url,data,cb)
};
//是否存在个人shopping_cart
var search_shopping_cart = function(data,cb){
	var url = "http://127.0.0.1:8030/search_shopping_cart";
	do_post_method(url,data,cb)
};
exports.register = function(server, options, next){
	server.route([
		//desc,需要服务器地址
		{
			method: 'GET',
			path: '/desc',
			handler: function(request, reply){
				return reply({"success":"ok","server":"ec_search server, ec_interaction server, ec_shopping_cart server, ec_product server, ec_order server, ec_web server"});
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
				var product_id = request.query.product_id;
				find_properties_by_product(product_id, function(err, result){
					if (!err) {
						return reply.view("product_text_configure",{"rows":result.properties});
					}else {

					}
				});
			}
		},
		//产品评论
		{
			method: 'GET',
			path: '/product_comment',
			handler: function(request, reply){
				var product_id = request.query.product_id;
				var ep =  eventproxy.create("comments","again_comments","comment_data",function(comments,again_comments,comment_data){
					var comments_ids = [];
					var comments_persons = [];
					if (comments && comments.length >0) {
						if (comments) {
							for (var i = 0; i < comments.length; i++) {
								comments_ids.push(comments[i].id);
								comments_persons.push(comments[i].person_id);
							}
							comments_persons = JSON.stringify(comments_persons);
							comments_ids = JSON.stringify(comments_ids);
							var eproxy =  eventproxy.create("persons","saidans","personsVip",function(persons,saidans,personsVip){
								var again_num = again_comments.length;
								var person_map = {};
								var saidan_map = {};
								for (var i = 0; i < persons.length; i++) {
									person_map[persons[i].person_id] = persons[i];
								}
								var personVip_map = {};
								for (var i = 0; i < personsVip.length; i++) {
									personVip_map[personsVip[i].person_id] = personsVip[i];
								}
								var again_comments_map = {};
								for (var i = 0; i < again_comments.length; i++) {
									again_comments_map[again_comments[i].parent] = again_comments[i];
								}
								if (saidans) {
									for (var i = 0; i < saidans.length; i++) {
										var saidan = saidans[i]; //一个晒单对象
										var comment_saidans = []; //晒单数组
										if (saidan_map[saidan.product_comments_id]) { //晒单评论id对应的存在
											comment_saidans = saidan_map[saidan.product_comments_id]; //晒单 = 晒单产品id
										}
										comment_saidans.push(saidan); //晒单添加 晒单对象
										saidan_map[saidan.product_comments_id] = comment_saidans; //晒单评论id = 晒单
									}
								}
								return reply.view("product_comment",{"comments":comments,"again_comments":again_comments_map,"comment_data":comment_data,"personsVip":personVip_map,"persons":person_map,"saidans":saidan_map,"again_num":again_num});
							});
							find_comments_persons(comments_persons, function(err, content){
								if (!err) {
									var persons = content.rows;
									eproxy.emit("persons", persons);
								}else {
									eproxy.emit("persons", []);
								}
							});
							find_comments_personsVip(comments_persons, function(err, content){
								if (!err) {
									var personsVip = content.rows;
									eproxy.emit("personsVip", personsVip);
								}else {
									eproxy.emit("personsVip", []);
								}
							});
							find_saidans_pictures(comments_ids, function(err, content){
								if (!err) {
									var saidans = content.rows;
									eproxy.emit("saidans", saidans);
								}else {
									eproxy.emit("saidans", []);
								}
							});
						}
					}else {
						return reply.view("product_comment",{"comments":comments,"again_comments":again_comments,"comment_data":comment_data});
					}
				});
				find_total_comments(product_id,function(err,results){
					if (!err) {
						var comment_data = results.row;
						ep.emit("comment_data", comment_data);
					}else {
						ep.emit("comment_data", []);
					}
				});
				find_again_comments(product_id,function(err,results){
					if (!err) {
						var again_comments = results.rows;
						ep.emit("again_comments", again_comments);
					}else {
						ep.emit("again_comments", []);
					}
				});
				find_comments_info(product_id,function(err,results){
					if (!err) {
						var comments = results.rows;
						ep.emit("comments", comments);
					}else {
						ep.emit("comments", []);
					}
				});
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
				var product_num = 1;
				var product_id = request.query.product_id;
				var product_price = request.query.product_price;
				var person_id = get_cookie_person(request);
				// var person_id = 1;
				var cart_code = get_cookie_cart_code(request);
				//判断是否登入
				if (!person_id) {
					//判断cookie是否有存在  并查数据库购物车信息,如果不存在，自动生成新建购物车，有合并
					if (!cart_code) {
						cart_code = uuidV1();
					};
					var data = {
						"cart_code" : cart_code,
						"product_id" : product_id,
						"product_num" : product_num,
						"product_price" : product_price
					};
					search_cart_code(data,function(err,result){
						if (!err) {
							if (result.param == 0) {
								var state;
								if (!request.state && !request.state.cookie) {
									state = request.state.cookie;
									state.cart_code = cart_code;
								}else {
									state = {cart_code:cart_code};
								}
								return reply({"success":true,"all_items":result.all_items}).state('cookie', state, {ttl:10*365*24*60*60*1000});
							}else {
								return reply({"success":true,"all_items":result.all_items});
							}
						}else {
							return reply({"success":false,"message":err});
						}
					});
				}else {
					var data = {
						"person_id" : person_id,
						"product_id" : product_id,
						"product_num" : product_num,
						"product_price" : product_price
					};
					search_shopping_cart(data,function(err,result){
						if (!err) {
							return reply({"success":true,"all_items":result.all_items});
						}else {
							return reply({"success":false,"message":err});
						}
					});
				}
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
		//买家确认收货
		{
			method: 'GET',
			path: '/receive_goods',
			handler: function(request, reply){
				var order_id = request.query.order_id;
				receive_goods_operations(order_id,function(err,result){
					if (!err) {
						return reply({"success":true});
					}else {

					}
				});
			}
		},
		//个人信息
		{
			method: 'GET',
			path: '/person_info',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var ep =  eventproxy.create("persons","personsVip",
					function(persons,personsVip){
					return reply.view("person_info",{"success":true,"persons":persons,"personsVip":personsVip});
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
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				search_person_address(person_id,function(err,results){
					if (!err) {
						return reply.view("address_management",{"addresses":JSON.stringify(results.rows)});
					}else {

					}
				});

			}
		},
		//修改默认地址
		{
			method: 'GET',
			path: '/address_default',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var address_id = request.query.address_id;
				var data = {
					"address_id" : address_id,
					"person_id"  : person_id
				}
				update_default_address(data,function(err,result){
					if (!err) {
						return reply({"success":true});
					}
				});
			}
		},
		//地址删除
		{
			method: 'GET',
			path: '/address_delete',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var address_id = request.query.address_id;
				var data = {
					"address_id" : address_id,
					"person_id"  : person_id
				}
				delete_address(data,function(err,result){
					if (!err) {
						return reply({"success":true});
					}
				});
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
		//查询地址信息
		{
			method: 'GET',
			path: '/search_address',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var address_id = request.query.address_id;
				search_address(address_id,person_id,function(err,result){
					if (!err) {
						return reply.view("edit_address",{"address":JSON.stringify(result.row)});
					}else {
					}
				});
			}
		},
		//新增地址
		{
			method: 'GET',
			path: '/new_address',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				var data = {};
				var info = JSON.parse(request.query.info);
				data.linkname = info.linkname;
				data.mobile = info.mobile;
				data.alias = info.alias;
				data.detail_address = info.detail_address;
				data.is_default = info.is_default;
				data.person_id = person_id;
				data.province = "上海";
				data.city = "市";
				data.district = "宝山区";
				if (info.address_id) {
					data.address_id = info.address_id;
				}
				save_address(data,function(err,result){
					if (!err) {
						return reply({"success":true});
					}else {

					}
				});
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
				var person_id = get_cookie_person(request);
				if (!person_id) {
					person_id = 1;
				}
				search_favorite_list(person_id,function(err,results){
					if (!err) {
						var product_ids = [];
						for (var i = 0; i < results.rows.length; i++) {
							product_ids.push(results.rows[i].product_id);
						}
						product_ids = JSON.stringify(product_ids);
						search_products_list(product_ids,function(err,results){
							if (!err) {
								console.log("products"+JSON.stringify(results.products));
								return reply.view("favorite_list",{"products":results.products});
							}else {
							}
						});
					}else {

					}
				});
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
		//账户余额
		{
			method: 'GET',
			path: '/account_yue',
			handler: function(request, reply){
				return reply.view("yue");
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

				var ep =  eventproxy.create("order","details","products","order_address","logistics_info","invoices",
					function(order,details,products,order_address,logistics_info,invoices){
						var invoices_map = {};
						for (var i = 0; i < invoices.length; i++) {
							invoices_map[invoices[i].order_id] = invoices[i];
						}
					return reply.view("order_detail",{"order":order,"order_address":order_address,"details":details,"products":products,"logistics_info":logistics_info,"invoices":invoices_map});
				});

				get_ec_order(order_id,function(err,results){
					if (!err) {
						ep.emit("order", results.orders[0]);
						ep.emit("details", results.details);
						ep.emit("products", results.products);
					}else {
						ep.emit("order", {});
						ep.emit("details", {});
						ep.emit("products", {});
					}
				});

				get_order_address(person_id,function(err,results){
					if (!err) {
						ep.emit("order_address", results.address[0]);
					}else {
						ep.emit("order", {});
					}
				});
				get_logistics_info(order_id,function(err,results){
					if (!err) {
						ep.emit("logistics_info", results.row);
					}else {
						ep.emit("logistics_info", {});
					}
				});
				var order_ids = [];
				order_ids = JSON.stringify(order_ids.push(order_id));
				get_invoice_info(person_id,order_ids,function(err,results){
					if (!err) {
						ep.emit("invoices", results.rows);
					}else {
						ep.emit("invoices", []);
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
