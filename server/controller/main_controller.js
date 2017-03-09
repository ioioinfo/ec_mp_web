// Base routes for item..
const uu_request = require('../utils/uu_request');
﻿var industries = require('../utils/industries.js');
var eventproxy = require('eventproxy');
const uuidV1 = require('uuid/v1');
var service_info = "web service";
var org_code = "ioio";
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
	var url = "http://127.0.0.1:18016/search_sorts";
	do_get_method(url,cb);
};
//查询订单
var search_order = function(order_id,cb) {
        var url = "http://211.149.248.241:18010/search_order_infos?order_id="+order_id;
        uu_request.do_get_method(url,function(err,content){
            cb(false,content.row);
        });
    };
//登入，合并设置cookie
var login_set_cookie = function(request,person_id){
	var state;
	if (request.state && request.state.cookie) {
		state = request.state.cookie;
		state.person_id = person_id;
	}else {
		state = {person_id:person_id};
	}
	var cart_code = get_cookie_cart_code(request);
	if (cart_code) {
		console.log("person_id:"+person_id);
		combine_shopping_cart(cart_code,person_id,function(err,result){
		});
	}
	return state;
};
//cooke person
var get_cookie_person = function(request){
	var person_id;
	if (request.state && request.state.cookie) {
		state = request.state.cookie;
		if (state.person_id) {
			person_id = state.person_id;
		}
	}
	return person_id;
};
//获取当前cookie cookie_id
var get_cookie_id = function(request){
	var cookie_id;
	if (request.state && request.state.cookie) {
		var cookie = request.state.cookie;
		if (cookie.cookie_id) {
			cookie_id = cookie.cookie_id;
		}
	}
	return cookie_id;
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
//推荐
var get_recommend_products = function(person_id,cb){
	var url = "http://139.196.148.40:16001/get_recommend_products?person_id=";
	url = url + person_id;
	do_get_method(url,cb);
};
//热销
var get_hot_sale_products = function(person_id,cb){
	var url = "http://139.196.148.40:16001/get_hot_sale_products?person_id=";
	url = url + person_id;
	do_get_method(url,cb);
};
//新品
var get_new_arrival_products = function(person_id,cb){
	var url = "http://139.196.148.40:16001/get_new_arrival_products?person_id=";
	url = url + person_id;
	do_get_method(url,cb);
};

//通过商品id找到图片
var find_pictures_byId = function(product_id, cb){
	var url = "http://127.0.0.1:18002/get_product_pictures?product_id=";
	url = url + product_id;
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
	var url = "http://139.196.148.40:18003/get_person_avatar?person_ids=";
	url = url + persons + "&scope_code=" +org_code;
	do_get_method(url,cb);
};
//根据personid找vip
var find_personsVip = function(persons, cb){
	var url = "http://139.196.148.40:18003/vip/list_by_scope_persons?person_ids=";
	url = url + persons + "&scope_code=" +org_code;
	do_get_method(url,cb);
};
//得到所有订单
var get_ec_orders = function(person_id,cb){
	var url = "http://127.0.0.1:18010/get_ec_orders?person_id="+person_id;
	do_get_method(url,cb);
};
//得到单个订单
var get_ec_order = function(order_id,cb){
	var url = "http://127.0.0.1:18010/get_ec_order?order_id="+order_id;
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
	var url = "http://127.0.0.1:18014/comments_show?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
};
//根据id找到追评
var find_again_comments = function(product_id, cb){
	var url = "http://127.0.0.1:18014/again_comments?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
}
//根据评论找晒单
var find_saidans_pictures = function(comments_ids, cb){
	var url = "http://127.0.0.1:18014/comments_saidan?comments_ids=";
	url = url + comments_ids;
	do_get_method(url,cb);
};
//好评，差评，总数
var find_total_comments = function(product_id, cb){
	var url = "http://139.196.148.40:16001/get_products_comment_summary?product_ids=";
	url = url + product_id;
	do_get_method(url,cb);
};
//根据personid找头像
var find_comments_persons = function(person_id, cb){
	var url = "http://139.196.148.40:18003/get_person_avatar?person_ids=";
	url = url + person_id + "&scope_code=" +org_code;
	do_get_method(url,cb);
};
//根据personid找vip
var find_comments_personsVip = function(comments_persons, cb){
	var url = "http://139.196.148.40:18003/vip/list_by_scope_persons?person_ids=";
	url = url + comments_persons + "&scope_code=" +org_code;
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
//查询message数量
var check_message_number = function(person_id,platform_code,cb){
	var url = "http://139.196.148.40:18005/get_notify_count?platform_code=" + platform_code + "&person_id=" + person_id;
	do_get_method(url,cb);
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
//通过商品id，行业id找到行业信息
var find_industry = function(industry_id,product_id, cb){
	var url = "http://127.0.0.1:18002/products_industries?product_id=";
	url = url + product_id + "&industry_id=" + industry_id;
	do_get_method(url,cb);
};
//通过商品id查找到商品
var find_product_byId = function(product_id, cb){
	var url = "http://127.0.0.1:18002/product_info?product_id=";
	url = url + product_id;
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
	var url = "http://127.0.0.1:18015/new_none_person_cart";
	do_post_method(url,data,cb);
};
//是否存在cart_code
var search_cart_code = function(data,cb){
	var url = "http://127.0.0.1:18015/search_cart_code";
	do_post_method(url,data,cb)
};
//是否存在个人shopping_cart
var search_shopping_cart = function(data,cb){
	var url = "http://127.0.0.1:18015/search_shopping_cart";
	do_post_method(url,data,cb)
};
//获取验证图片
var get_captcha = function(cookie_id,cb){
	var url = "http://139.196.148.40:11111/api/captcha.png?cookie_id="+cookie_id;
	do_get_method(url,cb);
};
//验证码验证
var check_captcha = function(vertify,cookie_id,cb){
	var url = "http://139.196.148.40:11111/api/verify?cookie_id=" +cookie_id + "&text=" + vertify;
	do_get_method(url,cb);
};
//根据产品id找产品详细
var find_product_details = function(product_id, cb){
	var url = "http://127.0.0.1:18002/get_product_details?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
};
//登入账号验证
var do_login = function(data, cb){
	var url = "http://139.196.148.40:18666/user/login_check";
	do_post_method(url,data,cb);
};
//发现vip
var get_person_vip = function(person_id,cb){
	var url = "http://139.196.148.40:18666/vip/get_by_person_id?person_id=" + person_id + "&org_code=" + org_code;
	do_get_method(url,cb);
};
//合并购物车
var combine_shopping_cart = function(cart_code,person_id,cb){
	var url = "http://127.0.0.1:18015/combine_shopping_cart?person_id=";
	url = url + person_id + "&cart_code=" + cart_code;
	do_get_method(url,cb);
}
//注册
var do_register = function(data, cb){
	var url = "http://139.196.148.40:18666/user/register";
	do_post_method(url,data,cb);
};
//根据id找到商品小图片
var find_samll_picture = function(same_product_ids, cb){
	var url = "http://127.0.0.1:18002/get_products_picture?product_ids=";
	url = url + JSON.stringify(same_product_ids);
	do_get_method(url,cb);
};
//得到验证码
var get_vertify = function(mobile,cb){
	var url = "http://139.196.148.40:11111/api/mobile_sms?mobile="+mobile;
	do_get_method(url,cb);
};
//做验证
var do_vertify = function(data,cb){
	var url = "http://139.196.148.40:11111/api/dy_login";
	do_post_method(url,data,cb);
};
//vip注册
var do_vip = function(data, cb){
	var url = "http://139.196.148.40:18003/vip/add_vip";
	do_post_method(url,data,cb);
};
//修改密码
var change_password = function(data,cb){
	var url = "http://139.196.148.40:18666/password/change";
	do_post_method(url,data,cb);
};
//查询
var search_all_products = function(search_object,cb){
	var url = "http://127.0.0.1:18016/search_products";
	do_post_method(url,{"search_object":JSON.stringify(search_object)},cb);
};
//查询库存
var find_stock = function(industry_id,product_id,stock_options,cb){
	var url = "http://211.149.248.241:12001/get_product_stock_for_view?product_id=";
	url = url + product_id + "&industry_id=" + industry_id + "&stock_options=" +JSON.stringify(stock_options);
	do_get_method(url,cb);
};
//发现无人购物车
var find_none_person_cart = function(cart_code,cb){
	var url = "http://127.0.0.1:18015/find_none_person_cart?cart_code="+cart_code;
	do_get_method(url,cb);
};
//删除购物车
var delete_shopping_carts = function(ids,cb){
	var url = "http://127.0.0.1:18015/delete_shopping_carts?ids=";
	url = url + ids;
	do_get_method(url,cb);
};
//购物车  商品数量+1
var plus_shopping_carts = function(ids,cb){
	var url = "http://127.0.0.1:18015/plus_shopping_carts?ids=";
	url = url + ids;
	do_get_method(url,cb);
};
//查询同类商品
var find_same_products = function(product_id, same_code, cb){
	console.log("same_code:"+same_code);
	var url = "http://127.0.0.1:18002/get_same_products?product_id=";
	url = url + product_id + "&same_code=" + same_code;
	do_get_method(url,cb);
};
//购物车  商品数量-1
var reduce_shopping_carts = function(ids,cb){
	var url = "http://127.0.0.1:18015/reduce_shopping_carts?ids=";
	url = url + ids;
	do_get_method(url,cb);
};
//购物车  商品数量修改
var update_shopping_carts = function(ids,num,cb){
	var url = "http://127.0.0.1:18015/update_shopping_carts?ids=";
	url = url + ids + "&num=" + num;
	do_get_method(url,cb);
};
//查询购物车
var sarch_cart_infos = function(person_id,cart_code,cb){
	var url = "http://127.0.0.1:18015/sarch_cart_infos?person_id=";
	url = url + person_id + "&cart_code=" + cart_code;
	do_get_method(url,cb);
};
//查询销售量
var find_product_sales = function(product_id,cb){
	var url = "http://139.196.148.40:16001/get_product_sales?product_id=";
	url = url + product_id;
	do_get_method(url,cb);
};
//发现有人购物车
var find_person_cart = function(person_id,cb){
	var url = "http://127.0.0.1:18015/find_person_cart?person_id="+person_id;
	do_get_method(url,cb);
};
//更新购物车商品状态
var update_selected = function(data,cb){
	var url = "http://127.0.0.1:18015/update_selected";
	do_post_method(url,data,cb);
};
//查询地址，取默认的
var search_addresses = function(person_id,cb){
	var url = "http://139.196.148.40:18003/address/list_by_person?person_id=";
	url = url + person_id;
	do_get_method(url,cb);
};
//开票接口
var search_ec_invoices = function(person_id,cb){
	var url = "http://139.196.148.40:18006/invoice/list_by_person?person_id=";
	url = url + person_id;
	do_get_method(url,cb);
};
//物流运费
var logistics_payment = function(data,cb){
	var url = "http://211.149.248.241:18013/freightage/compute";
	do_post_method(url,data,cb);
};
//保存订单信息
var save_order_infos = function(data,cb){
	var url = "http://127.0.0.1:18010/save_order_infos";
	do_post_method(url,data,cb);
}
//根据id查购物车
var search_selected_carts = function(person_id,ids,cb){
	var url = "http://127.0.0.1:18015/search_selected_carts?person_id=";
	url = url + person_id + "&ids=" + ids;
	do_get_method(url,cb);
};
//
var check_cart_number = function(person_id,cart_code,cb){
	var url = "http://127.0.0.1:18015/check_cart_number?person_id=";
	url = url + person_id + "&cart_code=" + cart_code;
	do_get_method(url,cb);
}
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
		{
			method: 'GET',
			path: '/search_sorts',
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
						return reply({"sorts":level_map});
					}else {
					}
				});
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
		//分类
		{
			method: 'GET',
			path: '/sort2',
			handler: function(request, reply){
				return reply.view("sort2",{});
			}
		},
		//查询
		{
			method: 'GET',
			path: '/search',
			handler: function(request, reply){
				var search_object = {};
				search_object.sort = request.query.sort;
				search_object.q = request.query.q;
				search_all_products(search_object,function(err,results){
					if (!err) {
						if (results.rows.length == 0) {
							return reply.view("search",{"products":[],"comments":{},"search_object":JSON.stringify(search_object)});
						}
						var product_ids = [];
						for (var i = 0; i < results.rows.length; i++) {
							product_ids.push(results.rows[i].id);
						}

						find_total_comments(JSON.stringify(product_ids),function(err,content){
							if (!err) {
								var comments_map = {};
								for (var i = 0; i < content.rows.length; i++) {
									comments_map[content.rows[i].product_id] = content.rows[i];
								}
								return reply.view("search",{"products":results.rows,"comments":comments_map,"search_object":JSON.stringify(search_object)});
							}else {
								return reply({"success":false,"message":content.message});
							}
						});
					}else {
						return reply({"success":false,"message":content.message});
					}
				});
			}
		},
		//查询搜索
		{
			method: 'GET',
			path: '/search_area',
			handler: function(request, reply){
				var q = request.query.q;
				return reply.view("search_area",{"q":q});
			}
		},
		//产品展示
		{
			method: 'GET',
			path: '/product_show',
			handler: function(request, reply){
				var product_id = request.query.product_id;
				var person_id = get_cookie_person(request);
				var is_active = 0;
				find_product_byId(product_id, function(err, content){
					if (!err) {
						var product = content.row;
						if (!product) {
							return reply({"success":false,"message":"产品不存在"});
						}
						var industry_id = product.industry_id;
						var same_code = product.same_code;
						var industry = industries[industry_id];
						if (!industry) {
							return reply({"success":false,"message":"行业不存在"});
						}
						var stock_options = {"region_id":"1"};
						var page_name = industry["view_name"];
						//行业属性
						var industry_properties = industry["properties"];

						var ep =  eventproxy.create("pictures","stock","sales","same_pictures","total_comments","comments","persons","saidans","product_details","again_comments","personsVip",
							function(pictures,stock,sales,same_pictures,total_comments,comments,persons,saidans,product_details,again_comments,personsVip){
							product.mp_pictures = pictures;
							product.mp_industry = industry;
							product.mp_stock = stock;
							product.mp_sales = sales;
							product.mp_same_pictures = same_pictures;
							product.mp_total_comments = total_comments;
							product.mp_comments = comments;
							product.mp_persons = persons;
							product.mp_personsVip = personsVip;
							product.mp_saidans = saidans;
							product.mp_product_details = product_details;
							product.mp_page_name = page_name;
							product.again_comments = again_comments;
							return reply.view(industry.view_name,{"product":product,"industry_properties":industry_properties});
						});
						find_stock(industry_id,product_id,stock_options,function(err, content){
							if (!err) {
								var stocks = content.stocks;
								var properties = content.properties;
								ep.emit("stock",{"properties":properties,"stocks":stocks});
							}else {
								ep.emit("stock",{"properties":{},"stocks":{}});
							}
						});
						find_pictures_byId(product_id, function(err, content){
							if (!err) {
								var pictures = content.rows;
								ep.emit("pictures", pictures);
							}else {
								ep.emit("pictures", {});
							}
						});
						find_product_sales(product_id, function(err, content){
							if (!err) {
								var sales = content.row;
								ep.emit("sales", sales);
							}else {
								ep.emit("sales", {});
							}
						});
						find_total_comments(JSON.stringify([product_id]), function(err, content){
							if (!err) {
								if (content.rows.length >0) {
									var total_comments = content.rows[0];
									ep.emit("total_comments", total_comments);
								}else {
									ep.emit("total_comments", []);
								}

							}else {
								ep.emit("total_comments", {});
							}
						});
						find_same_products(product_id, same_code, function(err, content){
							if (!err) {
								var same_products = content.rows;
								var same_product_ids = [];
								if (same_products) {
									for (var i = 0; i < same_products.length; i++) {
										same_product_ids.push(same_products[i].id);
									}
									console.log("same_product_ids: "+same_product_ids);
									find_samll_picture(same_product_ids, function(err, content){
										if (!err) {
											var same_pictures = content.rows;
											console.log(same_pictures);
											ep.emit("same_pictures", same_pictures);
										} else {
											ep.emit("same_pictures", []);
										}
									});
								}else {
									ep.emit("same_pictures", []);
								}
							}else {
								ep.emit("same_pictures", []);
							}
						});
						find_comments_info(product_id, function(err, content){
							if (!err) {
								var comments = content.rows;
								var comments_ids = [];
								var comments_persons = [];
								if (comments) {
									for (var i = 0; i < comments.length; i++) {
										comments_ids.push(comments[i].id);
										comments_persons.push(comments[i].person_id);
									}
									comments_persons = JSON.stringify(comments_persons);
									comments_ids = JSON.stringify(comments_ids);
									var eproxy =  eventproxy.create("persons","saidans","personsVip",
										function(persons,saidans,personsVip){
											ep.emit("comments", comments);
											var person_map = {};
											var saidan_map = {};
											for (var i = 0; i < persons.length; i++) {
												person_map[persons[i].person_id] = persons[i];
											}
											var personVip_map = {};
											for (var i = 0; i < personsVip.length; i++) {
												personVip_map[personsVip[i].person_id] = personsVip[i];
											}
											if (saidans) {
												for (var i = 0; i < saidans.length; i++) {
													var saidan = saidans[i]; //一个晒单对象
													var comment_saidans = [];
													if (saidan_map[saidan.product_comments_id]) { //晒单评论id对应的不存在
														comment_saidans = saidan_map[saidan.product_comments_id]; //晒单 = 晒单产品id
													}
													comment_saidans.push(saidan); //晒单添加 晒单对象
													saidan_map[saidan.product_comments_id] = comment_saidans; //晒单评论id = 晒单
												}
											}
											ep.emit("personsVip", personVip_map);
											ep.emit("persons", person_map);
											ep.emit("saidans", saidan_map);
									});
									find_comments_persons(comments_persons, function(err, content){
										console.log("find_comments_persons"+JSON.stringify(content));
										if (!err) {
											var persons = content.rows;
											eproxy.emit("persons", persons);
										}else {
											eproxy.emit("persons", []);
										}
									});
									find_comments_personsVip(comments_persons, function(err, content){
										console.log("find_comments_personsVip"+JSON.stringify(content));
										if (!err) {
											var personsVip = content.rows;
											eproxy.emit("personsVip", personsVip);
										}else {
											eproxy.emit("personsVip", []);
										}
									});
									find_saidans_pictures(comments_ids, function(err, content){
										console.log("find_saidans_pictures"+JSON.stringify(content));
										if (!err) {
											var saidans = content.rows;
											eproxy.emit("saidans", saidans);
										}else {
											eproxy.emit("saidans", []);
										}
									});
								}else {
									ep.emit("comments", []);
									ep.emit("personsVip", {});
									ep.emit("persons", []);
									ep.emit("saidans", []);
								}
							} else {
								ep.emit("comments", []);
								ep.emit("personsVip", {});
								ep.emit("persons", []);
								ep.emit("saidans", []);
							}
						});
						find_product_details(product_id, function(err, content){
							if (!err) {
								var  product_details = content.rows;
								ep.emit("product_details", product_details);
							}else {
								ep.emit("product_details", []);
							}
						});
						find_again_comments(product_id, function(err, content){
							if (!err) {
								var again_comments = content.rows;
								ep.emit("again_comments", again_comments);
							}else {
								ep.emit("again_comments", []);
							}
						});
					}else {
						return reply("404");
					}
				});
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
				find_total_comments(JSON.stringify([product_id]),function(err,results){
					if (!err) {
						if (results.rows.length >0) {
							var comment_data = results.rows[0];
							ep.emit("comment_data", comment_data);
						}else {
							ep.emit("comment_data", []);
						}
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
		//推荐
		{
			method: 'GET',
			path: '/get_recommend_products',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				get_recommend_products(person_id,function(err,content){
					if (!err) {
						var products = content.rows;
						return reply({"success":true,"products":products,"message":"ok"});
					}else {
						return reply({"success":false,"message":content.message});
					}
				});
			}
		},
		//热销
		{
			method: 'GET',
			path: '/get_hot_sale_products',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				get_hot_sale_products(person_id,function(err,content){
					if (!err) {
						var products = content.rows;
						return reply({"success":true,"products":products,"message":"ok"});
					}else {
						return reply({"success":false,"message":content.message});
					}
				});
			}
		},
		//新品
		{
			method: 'GET',
			path: '/get_new_arrival_products',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				get_new_arrival_products(person_id,function(err,content){
					if (!err) {
						var products = content.rows;
						return reply({"success":true,"products":products,"message":"ok"});
					}else {
						return reply({"success":false,"message":content.message});
					}
				});
			}
		},
		//修改收藏
		{
			method: 'POST',
			path: '/update_favorite',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/chat_login");
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
			method: 'POST',
			path: '/shopping_cart',
			handler: function(request, reply){
				var product_num = request.payload.num;
				var product_id = request.payload.product_id;
				var product_price = request.payload.product_price;
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);
				//判断是否登入
				console.log("person_id:"+person_id);
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
								if (request.state && request.state.cookie) {
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
						console.log("result:"+JSON.stringify(result));
						if (!err) {
							return reply({"success":true,"all_items":result.all_items});
						}else {
							return reply({"success":false,"message":err});
						}
					});
				}
			}
		},
		//购物车展示
		{
			method: 'GET',
			path: '/cart_infos',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);
				console.log("cart_code:"+cart_code);
				if (!person_id) {
					person_id = "";
				}
				if (!cart_code) {
					cart_code = uuidV1();
				}
				//查询购物车信息
				sarch_cart_infos(person_id,cart_code,function(err,results){
					if (!err) {
						console.log("results:"+JSON.stringify(results));
						var update_ids = [];
						var total_data = results.total_data;
						return reply.view("shopping_cart",{"success":true,"shopping_carts":JSON.stringify(results.shopping_carts),"update_ids":JSON.stringify(update_ids),"products":JSON.stringify(results.products),"total_data":JSON.stringify(total_data)});
					}else {
						return reply({"success":false,"message":results.message});
					}
				});
			}
		},
		//购物车删除
		{
			method: 'GET',
			path: '/delete_cart',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);

				if (!person_id) {
					person_id = "";
				}
				var id = request.query.id;
				var ids = [];
				ids.push(id);
				ids = JSON.stringify(ids);

				console.log(ids);
				delete_shopping_carts(ids,function(err,content){
					if (!err) {
						//查询购物车信息
						sarch_cart_infos(person_id,cart_code,function(err,results){
							if (!err) {
								var update_ids = [];
								var total_data = results.total_data;
								return reply({"success":true,"shopping_carts":JSON.stringify(results.shopping_carts),"update_ids":JSON.stringify(update_ids),"products":JSON.stringify(results.products),"total_data":JSON.stringify(total_data)});
							}else {
								return reply({"success":false,"message":results.message});
							}
						});
					}else {
						return reply({"success":false,"message":results.message,"service_info":service_info});
					}
				});
			}
		},
		//购物车商品数量+1
		{
			method: 'POST',
			path: '/plus_cart',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);
				var id = request.payload.id;
				var ids = [];
				ids.push(id);
				ids = JSON.stringify(ids);
				if (!person_id) {
					person_id = "";
				}
				if (!cart_code) {
					cart_code = "";
				}
				plus_shopping_carts(ids,function(err,content){
					if (!err) {
						//查询购物车信息
						sarch_cart_infos(person_id,cart_code,function(err,results){
							if (!err) {
								var update_ids = [];
								var total_data = results.total_data;
								return reply({"success":true,"shopping_carts":JSON.stringify(results.shopping_carts),"update_ids":JSON.stringify(update_ids),"products":JSON.stringify(results.products),"total_data":JSON.stringify(total_data)});
							}else {
								return reply({"success":false,"message":results.message});
							}
						});
					}else {
						return reply({"success":false,"message":results.message,"service_info":service_info});
					}
				});
			}
		},
		//购物车商品数量-1
		{
			method: 'POST',
			path: '/reduce_cart',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);
				var id = request.payload.id;
				var ids = [];
				ids.push(id);
				ids = JSON.stringify(ids);
				if (!person_id) {
					person_id = "";
				}
				if (!cart_code) {
					cart_code = "";
				}
				reduce_shopping_carts(ids,function(err,content){
					if (!err) {
						//查询购物车信息
						sarch_cart_infos(person_id,cart_code,function(err,results){
							if (!err) {
								var update_ids = [];
								var total_data = results.total_data;
								return reply({"success":true,"shopping_carts":JSON.stringify(results.shopping_carts),"update_ids":JSON.stringify(update_ids),"products":JSON.stringify(results.products),"total_data":JSON.stringify(total_data)});
							}else {
								return reply({"success":false,"message":results.message});
							}
						});
					}else {
						return reply({"success":false,"message":results.message,"service_info":service_info});
					}
				});
			}
		},
		//购物车商品数量改改
		{
			method: 'POST',
			path: '/update_cart_number',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);
				var num = request.payload.num;
				var id = request.payload.id;
				if (!num||!id) {
					return reply({"success":false,"message":"params null","service_info":service_info});
				}
				var ids = [];
				ids.push(id);
				ids = JSON.stringify(ids);
				if (!person_id) {
					person_id = "";
				}
				if (!cart_code) {
					cart_code = "";
				}
				update_shopping_carts(ids,num,function(err,content){
					if (!err) {
						//查询购物车信息
						sarch_cart_infos(person_id,cart_code,function(err,results){
							if (!err) {
								var update_ids = [];
								var total_data = results.total_data;
								return reply({"success":true,"shopping_carts":JSON.stringify(results.shopping_carts),"update_ids":JSON.stringify(update_ids),"products":JSON.stringify(results.products),"total_data":JSON.stringify(total_data)});
							}else {
								return reply({"success":false,"message":results.message});
							}
						});
					}else {
						return reply({"success":false,"message":results.message,"service_info":service_info});
					}
				});
			}
		},
		//空购物车
		{
			method: 'get',
			path: '/empty_cart',
			handler: function(request, reply){
				return reply.view("empty_cart");
			}
		},
		//购物车增加
		{
			method: 'GET',
			path: '/plus_cart2',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);
				var id = request.query.id;
				var ids = [];
				ids.push(id);
				ids = JSON.stringify(ids);
				plus_shopping_carts(ids,function(err,content){
					if (!err) {
						if (!person_id) {
							if (cart_code) {
								find_none_person_cart(cart_code,function(err,results){
									console.log("results:"+JSON.stringify(results));
									if (!err) {
										var update_ids = [];
										var total_data = {};
										var products = {};
										if (results.products) {
											products = results.products;
										}
										return reply({"success":true,"shopping_carts":JSON.stringify(results.shopping_carts),"update_ids":JSON.stringify(update_ids),"products":JSON.stringify(products),"total_data":JSON.stringify(total_data)});
									}else {
										return reply({"success":false,"message":results.message});
									}
								});
							}else {
								return reply.view("shopping_cart",{"shopping_cart":{}});
							}
						}else {
							find_person_cart(person_id,function(err,results){
								if (!err) {
									console.log("results:"+JSON.stringify(results));
									console.log("total_data:"+JSON.stringify(results.total_data));
									var total_data = {};
									if(results.total_data){
										total_data = results.total_data;
									}
									var products = {};
									if (results.products) {
										products = results.products;
									}
									return reply({"success":true,"shopping_carts":JSON.stringify(results.shopping_carts),"update_ids":JSON.stringify(results.update_ids),"products":JSON.stringify(products),"total_data":JSON.stringify(results.total_data)});
								}else {
									return reply({"success":false,"message":results.message});
								}
							});
						}
					}else {
						return reply({"success":false,"message":results.message,"service_info":service_info});
					}
				});
			}
		},
		//选中购物车
		{
			method: 'GET',
			path: '/update_cart',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);
				var ids = request.query.ids;
				var selected = request.query.selected;
				var data = {
					"ids" : ids,
					"selected" : selected,
					"person_id" : person_id,
					"cart_code" : cart_code
				};
				console.log("data:"+JSON.stringify(data));
				update_selected(data,function(err,results){
					console.log("results:"+JSON.stringify(results));
					if (!err) {
						var total_data = {};
						if(results.total_data){
							total_data = results.total_data;
						}
						return reply({"success":true,"shopping_carts":results.shopping_carts,"total_data":results.total_data});
					}else {
						return reply({"success":false,"message":results.message});
					}
				});
			}
		},
		//下订单
		{
			method: 'GET',
			path: '/place_order',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/chat_login");
				}
				var ids = request.query.ids;
				if (!ids) {
					return reply.redirect("//");
				}
				var ep =  eventproxy.create("shopping_carts","products","addresses","invoices","total_data","jifen", function(shopping_carts,products,addresses,invoices,total_data,jifen){
					logistics_payment(data,function(err,result){
						if (!err) {
							total_data.lgtic_pay = result.row.user_amount;
							return reply.view("place_order",{"shopping_carts":JSON.stringify(shopping_carts),"products":JSON.stringify(products),"addresses":JSON.stringify(addresses),"invoices":JSON.stringify(invoices),"total_data":JSON.stringify(total_data),"jifen":jifen});
						}else {
							return reply.view("place_order",{"shopping_carts":JSON.stringify(shopping_carts),"products":JSON.stringify(products),"addresses":JSON.stringify(addresses),"invoices":JSON.stringify(invoices),"total_data":JSON.stringify(total_data)});
						}
					});
				});
				var data = {
					"weight" : 0,
					"order_amount" : 0,
					"type" : "common",
					"store_id" : 1,
					"point_id" : null,
					"end_province" :"广东省" ,
					"end_city" : "",
					"end_district" : ""

				};
				search_selected_carts(person_id,ids,function(err,results){
					if (!err) {
						if (results.success) {
							var shopping_carts = results.shopping_carts;
							var products = results.products;
							var total_data = results.total_data;
							if (total_data.total_items) {
								data.order_amount = total_data.total_items;
							}
							if (total_data.total_weight) {
								data.weight = total_data.total_weight/1000;
							}
							ep.emit("shopping_carts", shopping_carts);
							ep.emit("products", products);
							ep.emit("total_data", total_data);
						}else {
							ep.emit("shopping_carts", []);
							ep.emit("products", {});
							ep.emit("total_data", {});
						}
					}else {
						ep.emit("shopping_carts", []);
						ep.emit("products", {});
						ep.emit("total_data", {});
					}
				});
				search_addresses(person_id,function(err,results){
					if (!err) {
						if (results.success) {
							var addresses = results.rows;
							for (var i = 0; i < addresses.length; i++) {
								if (addresses[i].is_default ==1) {
									console.log("addresses[i]:"+JSON.stringify(addresses[i]));
									data.end_province = addresses[i].province;
									data.end_city = addresses[i].city;
									data.end_district = addresses[i].district;
								}
							}
							ep.emit("addresses", addresses);
						}else {
							ep.emit("addresses", []);
						}
					}else {
						ep.emit("addresses", []);
					}
				});
				search_ec_invoices(person_id,function(err,results){
					if (!err) {
						if (results.success) {
							var invoices = results.rows;
							ep.emit("invoices", invoices);
						}else {
							ep.emit("invoices", []);
						}
					}else {
						ep.emit("invoices", []);
					}
				});
				get_person_vip(person_id,function(err,content){
					if (!err) {
						var jifen = content.row.integral;
						ep.emit("jifen", jifen);
					}else {
						ep.emit("jifen", "");
					}
				});
			}
		},
		//查询积分
		{
			method: 'GET',
			path: '/find_jifen',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply({"success":false,"messsage":"person_id null"});
				}
				get_person_vip(person_id,function(err,content){
					if (!err) {
						var jifen = content.row.integral;
						return reply({"success":true,"messsage":"ok","jifen":jifen});
					}else {
						return reply({"success":false,"messsage":content.messsage});
					}
				});
			}
		},
		//保存订单,核实订单信息
		{
			method: 'POST',
			path: '/order_save',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/chat_login");
				}
				if (!request.payload.total_data || !request.payload.shopping_carts || !request.payload.address) {
					return reply({"success":false,"message":"params wrong"});
				}
				var total_data = request.payload.total_data;
				var shopping_carts = request.payload.shopping_carts;
				var send_seller = request.payload.send_seller;
				var address = request.payload.address;
				var data = {"person_id":person_id,"total_data":total_data,"shopping_carts":shopping_carts,"send_seller":send_seller,"address":address};
				save_order_infos(data,function(err,content){
					if (!err) {
						return reply({"success":true,"message":"ok"});
					}else {
						return reply({"success":false,"message":content.message});
					}
				});
			}
		},
		//个人中心
		{
			method: 'GET',
			path: '/person_center',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/chat_login");
				}
				var ep =  eventproxy.create("persons","personsVip",
					function(persons,personsVip){
					return reply.view("person_center",{"success":true,"persons":persons,"personsVip":personsVip});
				});
				var person_ids = [person_id];
				console.log("person_ids:"+person_id);
				find_persons(JSON.stringify(person_ids), function(err, content){
					if (!err) {
						var persons = content.rows;
						ep.emit("persons", persons);
					}else {
						ep.emit("persons", []);
					}
				});
				find_personsVip(JSON.stringify(person_ids), function(err, content){
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
		//浏览历史
		{
			method: 'GET',
			path: '/history',
			handler: function(request, reply){
				return reply.view("history");
			}
		},
		//浏览历史
		{
			method: 'GET',
			path: '/find_favorite',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var product_id = request.query.product_id;
				if (!person_id) {
					return reply({"success":false});
				}
				find_favorite(product_id,person_id,function(err,content){
					if (!err) {
						return reply({"success":true,"is_active":content.row.is_active});
					}else {
						return reply({"success":false});
					}
				});
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
					return reply.redirect("/chat_login");
				}
				var person_ids = [person_id];
				var ep =  eventproxy.create("persons","personsVip",
					function(persons,personsVip){
					return reply.view("person_info",{"success":true,"persons":persons,"personsVip":personsVip});
				});
				find_persons(JSON.stringify(person_ids), function(err, content){
					if (!err) {
						var persons = content.rows;
						ep.emit("persons", persons);
					}else {
						ep.emit("persons", []);
					}
				});
				find_personsVip(JSON.stringify(person_ids), function(err, content){
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
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/chat_login");
				}
				get_ec_orders(person_id,function(err,results){
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
					return reply.redirect("/chat_login");
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
					return reply.redirect("/chat_login");
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
					return reply.redirect("/chat_login");
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
					return reply.redirect("/chat_login");
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
					return reply.redirect("/chat_login");
				}
				var data = {};
				var info = JSON.parse(request.query.info);
				data.linkname = info.linkname;
				data.mobile = info.mobile;
				data.alias = info.alias;
				data.detail_address = info.detail_address;
				data.is_default = info.is_default;
				data.person_id = person_id;
				data.province = info.province;
				data.city = info.city;
				data.district = info.district;
				if (info.address_id) {
					data.address_id = info.address_id;
				}
				save_address(data,function(err,result){
					if (!err) {
						return reply({"success":true,"address_id":result.address_id});
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
					return reply.redirect("/chat_login");
				}
				search_favorite_list(person_id,function(err,results){
					if (!err) {
						var product_ids = [];
						for (var i = 0; i < results.rows.length; i++) {
							product_ids.push(results.rows[i].product_id);
						}
						product_ids = JSON.stringify(product_ids);
						search_products_list(product_ids,function(err,results){
							console.log("results:"+JSON.stringify(results));
							if (!err) {
								console.log("products"+JSON.stringify(results.products));
								return reply.view("favorite_list",{"products":results.products});
							}else {
								return reply.view("favorite_list",{"products":{}});
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
		//账户积分
		{
			method: 'GET',
			path: '/jifen',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/chat_login");
				}
				person_id = JSON.stringify(person_id);
				console.log("person_id:"+person_id);
				return reply.view("jifen");
			}
		},
		//查询购物车里面商品
		{
			method: 'GET',
			path: '/check_cart_number',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				var cart_code = get_cookie_cart_code(request);
				if (!person_id) {
					person_id = "";
				}
				check_cart_number(person_id,cart_code,function(err,row){
					if (!err) {
						return reply({"success":true,"message":"ok","number":row.number,"service_info":service_info});
					}else {
						return reply({"success":false,"message":row.message,"service_info":service_info});
					}
				});
			}
		},
		//订单详情
		{
			method: 'GET',
			path: '/order_detail',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/chat_login");
				}
				var order_id = request.query.order_id;

				var ep =  eventproxy.create("order","details","products","logistics_info","invoices",
					function(order,details,products,logistics_info,invoices){
						var invoices_map = {};
						for (var i = 0; i < invoices.length; i++) {
							invoices_map[invoices[i].order_id] = invoices[i];
						}
					return reply.view("order_detail",{"order":order,"details":details,"products":products,"logistics_info":logistics_info,"invoices":invoices_map});
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
		//订单查看页面
        {
            method: 'GET',
            path: '/order_view',
            handler: function(request,reply) {
                var order_id = request.query.order_id;
                if (!order_id) {
                    return reply({"success":false,"message":"param order_id is null"});
                }
                //查询订单接口
                search_order(order_id,function(err,row) {
                    if (!row) {
                        return reply("收银小票不存在");
                    }
                    //结算方式
                    var pay_ways = [];
                    _.each(row.pay_infos,function(pay_info){
                        pay_ways.push(pay_info.pay_way);
                    });
                    row.pay_ways = _.join(pay_ways,",");
                    return reply.view(get_view("order_infos"),{"row":row});
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
		//获取验证
		{
			method: 'POST',
			path: '/get_vertify',
			handler: function(request, reply){
				var mobile = request.payload.phone;
				if (!mobile) {
					return reply({"success":false,"message":"param wrong"});
				}
				get_vertify(mobile,function(err,content){
					if (!err) {
						return reply({"success":true,"message":"ok"});
					}else {
						return reply({"success":false,"message":content.message});
					}
				});
			}
		},
		//手机验证
		{
			method: 'POST',
			path: '/do_vertify',
			handler: function(request, reply){

				var mobile = request.payload.mobile;
				var password = request.payload.password;
				if (!mobile || !password) {
					return reply({"success":false,"message":"param wrong"});
				}
				var data = {
					"mobile" : mobile,
					"password" : password
				};
				do_vertify(data,function(err,content){
					if (!err) {
						return reply({"success":true,"message":"ok"});
					}else {
						return reply({"success":false,"message":content.message});
					}
				})
			}
		},
		//微信注册功能 http://139.196.148.40:18666/user/register
		{
			method: 'POST',
			path: '/do_register',
			handler: function(request, reply){
				var data = {};
				data.mobile = request.payload.mobile;
				data.password = request.payload.password;
				data.username = request.payload.username;
				data.org_code = org_code;

				if (!data.password || !data.username || !data.mobile) {
					return reply({"success":false,"message":"param wrong","service_info":service_info});
				}
				do_register(data,function(err,result){
					console.log("result:"+JSON.stringify(result));
					if (!err) {
						var info = {};
						info.person_id = result.person_id;
						info.scope_code = org_code;
						info.person_name = data.username;
						info.mobile = data.mobile;
						do_vip(info,function(err,result){
							if (true) {
								var state = login_set_cookie(request,info.person_id);
								return reply({"success":true,"message":"ok","service_info":service_info}).state('cookie', state, {ttl:10*365*24*60*60*1000});
							}else {
								return reply({"success":false,"message":result.message,"service_info":service_info});
							}
						})
					}else {
						return reply({"success":false,"message":result.message,"service_info":service_info});
					}
				});
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
				var phone = request.query.acc;
				return reply.view("set_password",{"phone":phone});
			}
		},
		//微信账号登入
		{
			method: 'GET',
			path: '/chat_login',
			handler: function(request, reply){
				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					cookie_id = uuidV1();
				}
				var state = request.state.cookie;
				if (!state) {
					state = {};
				}
				state.cookie_id = cookie_id;
				return reply.view("chat_login").state('cookie', state, {ttl:10*365*24*60*60*1000});
			}
		},
		//验证码获取
		{
			method: 'GET',
			path: '/captcha',
			handler: function(request, reply){
				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					return reply({"success":false});
				}
				get_captcha(cookie_id,function(err, content){
					if (!err) {
						return reply({"success":true,"image":content.image,"service_info":service_info});
					}else {

					}
				});
			}
		},
		//登入验证
		{
			method: 'POST',
			path: '/do_login',
			handler: function(request, reply){
				var data = {};
				data.username = request.payload.username;
				data.password = request.payload.password;
				var vertify = request.payload.vertify;
				data.org_code = org_code;

				if (!data.username||!data.password||!vertify) {
					return reply({"success":false,"message":"params wrong"});
				}
				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					return reply({"success":false,"message":"vertify wrong"});
				}
				check_captcha(vertify,cookie_id,function(err, content){
					if (!err) {
						do_login(data, function(err,content){
							if (!err) {
								if (!content.success) {
									return reply({"success":false,"message":"password wrong"});
								}
								var person_id = content.row.person_id;
								if (!person_id) {
									return reply({"success":false,"message":"no account"});
								}

								var state = login_set_cookie(request,person_id);

								return reply({"success":true,"service_info":service_info}).state('cookie', state, {ttl:10*365*24*60*60*1000});
							}
						});
					}else {
						return reply({"success":false,"message":content.message});
					}
				});
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
		//消息页面
		{
			method: 'GET',
			path: '/messages',
			handler: function(request, reply){
				return reply.view("messages");
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
		//查询message数量
		{
			method: 'POST',
			path: '/check_message_number',
			handler: function(request, reply){
				var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply({"success":true,"message":"ok","count":0});
				}
				var platform_code = "ioio";
				check_message_number(person_id,platform_code,function(err,content){
					if (!err) {
						return reply({"success":true,"message":"ok","count":content.count});
					}else {
						return reply({"success":false,"message":content.message,"count":0});
					}
				});
			}
		},
		//登入首页
		{
			method: 'GET',
			path: '/',
			handler: function(request, reply){

				return reply.view("homePage");
			}
		},
		//登入忘记密码
		{
			method: 'GET',
			path: '/forget_password',
			handler: function(request, reply){

				return reply.view("forget_password");
			}
		},
		//修改密码密码
		{
			method: 'POST',
			path: '/change_password',
			handler: function(request, reply){
				var data = {};
				data.mobile = request.payload.mobile;
				data.password = request.payload.password;
				var cookie_id = get_cookie_id(request);
				if (!cookie_id) {
					cookie_id = uuidV1();
				}
				data.request_id = cookie_id;
				change_password(data,function(err,content){
					if (!err) {
						return reply({"success":true,"message":"ok"});
					}else {
						return reply({"success":false,"message":data.message});
					}
				});
			}
		},
    ]);

    next();
};

exports.register.attributes = {
    name: 'search_result'
};
