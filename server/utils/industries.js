var industries = {
	"1" : {"name":"酒","table_name":"industry_wines","view_name":"product_show","properties":
		[{"field_name":"origin","name":"原产地"},
			{"field_name":"capacity","name":"净含量"},
			{"field_name":"degree","name":"酒精度"},
			{"field_name":"level","name":"等级"},
			{"field_name":"type","name":"种类"},
			{"field_name":"specifications","name":"规格"},
			{"field_name":"carton","name":"箱规"},
			{"field_name":"row_materials","name":"原材料"}
		]
	},

	"2" : {"name":"女装","table_name":"industry_women_clothes","view_name":"clothes_show","properties":
		[{"field_name":"shop","name":"店铺"},
		 {"field_name":"style","name":"风格"},
		 {"field_name":"type","name":"类型"},
		 {"field_name":"collar","name":"领型"},
		 {"field_name":"popular","name":"流行元素"},
		 {"field_name":"sleeve","name":"袖长"},
		 {"field_name":"wasit_type","name":"腰型"},
		 {"field_name":"skirt_length","name":"裙长"},
		 {"field_name":"skirt_type","name":"裙型"},
		 {"field_name":"pattern","name":"版型"},
		 {"field_name":"time_to_market","name":"上市时间"},
		 {"field_name":"row-material","name":"质地"},
		 {"field_name":"size_name","name":"尺码"}
		]
	},
	"3" : {"name":"男装","table_name":"industry_men_clothes","view_name":"clothes_show","properties":
		[{"field_name":"brand_name","name":"品牌"},
		 {"field_name":"color_name","name":"颜色"}
		]
	},
	"101" : {"name":"善淘","table_name":"industry_santao","view_name":"product_show","properties":
		[{"field_name":"is_new","name":"成色"},
		 {"field_name":"row_materials","name":"材质"},
		 {"field_name":"size_name","name":"尺码/尺寸"},
		 {"field_name":"donator","name":"捐赠者"},
		 {"field_name":"batch_code","name":"批次"}
		]
	},










};
module.exports = industries;
