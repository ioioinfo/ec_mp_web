var React = require('react');
var ReactDOM = require('react-dom');
var Lunbo = require('newflash_v1.1');

// 框架
  class Warp extends React.Component {
      constructor(props) {
          super(props);
          this.setSelected = this.setSelected.bind(this);
          this.state={status:"0"};
      }
      setSelected(status){
          this.setState({status:status})
      }
    render() {
        return (
          <div className="wrap">
            <Layout setSelected={this.setSelected}/>
            <SearchCeng setSelected={this.setSelected} status={this.state.status} />
          </div>
        );
    }
  };
  // 框架
  class Layout extends React.Component {
    render() {
        return (
          <div className="Layout">
            <Header setSelected={this.props.setSelected}/>
            <Main/>
            <Footer/>
            <Background0/>
            <Background/>
            <Top/>
          </div>
        );
    }
  };
  // 轮播
  class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state={items:items,count:0};
    }
    handleClick(e){
        this.props.setSelected("1");
    }
    componentDidMount() {
        $.ajax({
          url: "/check_message_number",
          dataType: 'json',
          type: 'POST',
          success: function(data) {
              this.setState({count: data.count});
          }.bind(this),
          error: function(xhr, status, err) {
          }.bind(this)
      });
    }
    render() {
        var s = (<span className="headernewsnum">{this.state.count}</span>);
		var style = {display:"none"};
        if(this.state.count==0){
            s = (<span style={style}></span>);
        }
        return (
        <div>
          <div className="header">
            <div className="search">
              <span className="headersearch"  onClick={this.handleClick}>搜索</span>
              <span className="searchfangda"><img src="http://static.buy42.com/images/fangdajing.png" alt="" className="searchfangdaImg" /></span>
              <div className="headernews">
	            <a href="messages">
                    <img src="http://static.buy42.com/images/new2.png" alt="" className="headernimg" />

                    {s}
				</a>
              </div>
            </div>
          </div>
            <Lunbo items={this.state.items} />
        </div>
        );
    }
  };
  // 中间部分
  class Main extends React.Component {
    render() {
        return (
          <div className="main">
            <HomeNav/>
            <News/>
            <Activity/>
            <Like/>
          </div>
        );
    }
  };
  // 首页导航
  class HomeNav extends React.Component {
    constructor(props) {
        super(props);

        this.state={navitems:[]};
    }
    componentDidMount() {
      var nav = [{img:"http://static.buy42.com/ht_sy_xp.jpg",name:"每日新品",href:"search?lastest=1"},
                 {img:"http://static.buy42.com/ht_sy_qz.jpg",name:"裙装",href:"search?sort_id=001001"},
                 {img:"http://static.buy42.com/ht_sy_my.jpg",name:"母婴童装",href:"search?sort_id=007"},
                 {img:"http://static.buy42.com/ht_sy_sp.jpg",name:"饰品",href:"search?sort_id=004002"},
                 {img:"http://static.buy42.com/ht_sy_cj.jpg",name:"厨房用品",href:"search?sort_id=009002001"},
                 {img:"http://static.buy42.com/ht_sy_jj.jpg",name:"家具家纺",href:"search?sort_id=009"},
                 {img:"http://static.buy42.com/ht_sy_jz.jpg",name:"残障伙伴兼职",href:"part_job"},
                 {img:"http://static.buy42.com/ht_sy_gy.jpg",name:"关于善淘",href:"about_us"}];
                 this.setState({navitems:nav});
    }
    render() {
        return (
          <ul className="navUl">
          {this.state.navitems.map((item,index) => (
              <HomeNavli item={item} key={index} />))
          }
          </ul>
        );
    }
  };
  class HomeNavli extends React.Component {
    render() {
        return (
            <li className="homeNavli"><a href={this.props.item.href}><img src={this.props.item.img} alt="" /><p>{this.props.item.name}</p></a></li>
        );
    }
  };
  // 滚动新闻
  class News extends React.Component {
    constructor(props) {
        super(props);
        this.scroll=this.scroll.bind(this);
        this.state={headlineitems:[]};
    }
    componentDidMount() {
        $.ajax({
             url: "/published_headlines",
             dataType: 'json',
             type: 'GET',
             success: function(data) {
                this.setState({headlineitems:data.rows});
                if(data.rows.length>1){
                    setInterval(this.scroll,2800);
                }
             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });


    }
    scroll(){
      var liTop=$(".HomeNews li").first().css("margin-top");

      var liparseInt=parseInt(liTop);


        if (liparseInt<-20){
          var First=$(".HomeNews li").first();
          First.detach().css("margin-top","").appendTo($(".HomeNews"));
        }

      $(".HomeNews li").first().animate({"margin-top":"-25px"},450);

    }
    render() {
        return (
            <div className="news">
            <p className="yourLike"><span>头条新闻</span></p>
                <ul className="HomeNews">
                {this.state.headlineitems.map((item,index) => (
                    <NewsLi item={item}  key={index} />))
                }
                </ul>
                <span className="newsMore"><a href="news"></a></span>
            </div>
        );
    }
  };
  // 新闻内容
  class NewsLi extends React.Component {
      constructor(props) {
          super(props);
          this.handleClick=this.handleClick.bind(this);
      }
      handleClick(e){
          location.href="news_view?news_id="+this.props.item.id;
      }
    render() {

        return (

            <li className="newsLi"><u onClick={this.handleClick}>{this.props.item.title}</u></li>
        );
    }
  };
  // activity活动
  class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state={activityitems:[]};
    }
    componentDidMount() {
      var act = [{acname:"善淘网实体店2017-03-25开业",img:"https://img.alicdn.com/imgextra/i4/931691262/TB2_8.7ldhvOuFjSZFBXXcZgFXa-931691262.jpg"},
                  {acname:"现在充会员享特权啦",img:"https://img.alicdn.com/imgextra/i1/931691262/TB2xDhkoSFjpuFjSspbXXXagVXa-931691262.jpg"}];
      this.setState({activityitems:act});
    }
    render() {

        return (
          <div>
            <p className="yourLike"><span>最新活动</span></p>
            <ul className="activity_ul">
              {this.state.activityitems.map((item,index)=> (
                  <Activity_li item={item}   key={index}/>))
              }
            </ul>
          </div>

        );
    }
  };
  class Activity_li extends React.Component {
    render() {

        return (
          <li className="activity_li"><a href="news"><img src={this.props.item.img} alt="" /><p>{this.props.item.acname}</p></a></li>
        );
    }
  };


  // 猜你喜欢
  class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state={likeitems:[]};
    }
    componentDidMount() {
        $.ajax({
             url: "/find_lastest_products",
             dataType: 'json',
             data : {"num":8,"lastest":1},
             type: 'GET',
             success: function(data) {
                this.setState({likeitems:data.rows});
             }.bind(this),
             error: function(xhr, status, err) {
             }.bind(this)
        });
    }
    render() {

        return (
          <div>
            <p className="yourLike"><span>猜你喜欢</span></p>

            <ul className="homeLike">
              {this.state.likeitems.map((item,index) => (
                  <LikeLi item={item}  key={index} />))
              }
            </ul>
          </div>
        );
    }
  };
  // 猜你喜欢
  class LikeLi extends React.Component {

    render() {
        var href = "product_show?product_id="+ this.props.item.id;
        var img = "http://static.buy42.com/images/no_picture.png";
        if(this.props.item.img) {
            img = this.props.item.img.location;
        }
        return (
            <li className="homeLikeLi"><a href={href}><img src={img} alt="" /><p className="likename">{this.props.item.product_name}</p><p className="likeprice">￥<span>{this.props.item.product_sale_price}</span></p></a></li>
        );
    }
  };
  // 底部导航
  class Footer extends React.Component {
    render() {
        return (
          <ul className="footernav">
            <li><a href="/"><p><img src="http://static.buy42.com/images/shouye2.png" alt="" /></p><p>首页</p></a></li>
            <li><a href="/sort"><p><img src="http://static.buy42.com/images/fenlei4.png" alt="" /></p><p>分类</p></a></li>
            <li><a href="news"><p className="footerCenter"><img src="http://static.buy42.com/images/event.png" alt="" /></p></a></li>
            <li><a href="/cart_infos"><p><img src="http://static.buy42.com/images/gouwuche2.png" alt="" /></p><p>购物车</p></a></li>
            <li><a href="/person_center"><p><img src="http://static.buy42.com/images/wode.png" alt="" /></p><p>我的</p></a></li>
          </ul>
        );
    }
  };
  // 没有更多商品！！！
  class Background0 extends React.Component {
    render() {
        return (
          <div className="background0">别拉了，没有啦！</div>
        );
    }
  };

  // 返回顶部
  class Top extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    // 点击返回顶部
    handleClick(e){
       $('body,html').animate({scrollTop:0},400);
    }
    // 页面发生变化的时候触发
    componentDidMount() {
      $(window).scroll(function(){
        var topHeight=$(window).scrollTop();
        if (topHeight>500){
          //当滚动条的位置处于距顶部1000像素以下时，就是大于1000象数时，跳转出现
          $(".top").fadeIn(250);
        }else{ //否则就消失
          $(".top").fadeOut(250);
        }

      })
    }


    render() {
      var topHeight=$(window).scrollTop();

        return (
          <div className="top" onClick={this.handleClick}><img src="http://static.buy42.com/images/scroll-to-top-icon.png" alt="" /></div>
        );
    }
  };

  // 底部空白
  class Background extends React.Component {
    render() {
        return (
          <div className="background"></div>
        );
    }
  };

  // 搜索框弹出层
  class SearchCeng extends React.Component {
      constructor(props) {
          super(props);
          this.handleClick=this.handleClick.bind(this);
          this.handleClick1=this.handleClick1.bind(this);
          this.onKeyPress=this.onKeyPress.bind(this);
      }
      componentDidUpdate(prevProps, prevState) {
            $(".SearchCengInput").focus();
       }

      onKeyPress(e){
          var key = e.which;
    		if (key == 13) {
                this.props.setSelected("0");
    			var q = encodeURI(e.target.value);
    			location.href = "/search?q="+q;
    		}
      }
      handleClick(e){
          this.props.setSelected("0");
      }
      handleClick1(e){
           this.props.setSelected("0");
      }
    render() {
        var Ceng = <div></div>;
        if(this.props.status=="1"){
            Ceng = (<div className="SearchCeng">
                <div className="SearchCeng_top">
                  <span className="goBack" onClick={this.handleClick1}><img src="http://static.buy42.com/images/jiantou.png" alt="" /></span>
                  <input type="text" name="" placeholder="搜索" className="SearchCengInput" onKeyPress={this.onKeyPress} />
                  <span className="SearchCengNo" onClick={this.handleClick}>取消</span>
                </div>
                <p className="word">大家都在搜</p>
                <div className="SearchCeng_infor">
                  <span><a href="/search?q=礼服">礼服</a></span>
                  <span><a href="/search?q=棒球服">棒球服</a></span>
                  <span><a href="/search?q=孕妇裤">孕妇裤</a></span>
                  <span><a href="/search?q=休闲鞋">休闲鞋</a></span>
                  <span><a href="/search?q=板鞋">板鞋</a></span>
                  <span><a href="/search?q=电动车">电动车</a></span>
                  <span><a href="/search?q=手提包">手提包</a></span>
                  <span><a href="/search?q=行车记录仪">行车记录仪</a></span>
                  <span><a href="/search?q=礼品袋">礼品袋</a></span>
                  <span><a href="/search?q=移动电源">移动电源</a></span>
                </div>
            </div>);
        }
        return (
            Ceng
        );
    }
  };

  ReactDOM.render(
      <Warp/>,
      document.getElementById("content")
  );
