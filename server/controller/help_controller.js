//静态页面 帮助控制器
exports.register = function(server, options, next){
	server.route([
		//残障就业
		{
			method: 'GET',
			path: '/place_order1',
			handler: function(request, reply){
				return reply.view("place_order1");
			}
		},
        //残障就业
		{
			method: 'GET',
			path: '/part_job',
			handler: function(request, reply){
				return reply.view("part_job");
			}
		},
        //会员等级说明
		{
			method: 'GET',
			path: '/member_right',
			handler: function(request, reply){
				return reply.view("member_right");
			}
		},
        //售后说明
        {
            method: 'GET',
            path: '/after_sales',
            handler: function(request, reply){
                return reply.view("after_sales");
            }
        },

	]);

    next();
};

exports.register.attributes = {
    name: 'help_controller'
};
