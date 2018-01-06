//预加载
$(document).ready(function(){
    //预加载今日推荐内容
	var date = new Date();
	year = date.getFullYear();
	month = date.getMonth()+1;
	day = date.getDate()+1;
	//today 表示今天的日期
	today = year+"-"+month+"-"+day;
    ajaxPost(today);
    //滑条的y值
})
//随机图片
function randIMG() {
	var num = Math.ceil(Math.random()*10);
	var imgurl = "img/rand"+num+".png";
	return imgurl;

}
//加载更多
function more(obj) {
	//删除加载更多按钮
	$(obj).remove();
	//加载前一天的post
	day = day - 1;
    var history = year+"-"+month+"-"+day;
	ajaxPost(history);
}
//鼠标移上
function LLZmouseover(obj) {
    $(obj).css("backgroundColor","#E8F5F2");
    // $(obj).animate({marginTop:"+=20px"},"slow");
    $(obj).css("marginTop","2px");
}
//鼠标移开
function LLZmouseout(obj) {
	// $(obj).stop();
    $(obj).css("backgroundColor","white");
    $(obj).css("marginTop","0px");
}
//跳转到指定的url
function goUrl(url){
	//新开标签页跳转
	window.open(url,'_blank');
}
//点赞
function thumbUp(obj,id) {
    var count = $(obj).find("span").text();
    var intCount = parseInt(count);

	//拦截已赞
	if ($(obj).find("img")[0].src == "http://localhost:8080/img/thumbup32.png"){
		//赞数-1
        intCount = intCount-1;
        var stringCount = intCount + "";
        //更新赞数
        $(obj).find("span").text(stringCount);
        //更换图片
        $(obj).find("img").attr("src","img/thumb32.png");
        //动画效果
        var container = $(".main").children(".container");
        var lovebreak = $('<div class="lovebreak"><img src="img/lovebreak128.png"></div>');
        $(container).append(lovebreak);
        //爱心的top+scrollY
        var lovetop = $(".lovebreak").find("img").css("top");
        lovetop = parseInt(lovetop) + scrollY-150;
        lovetop = lovetop + "px";
        $(".lovebreak").find("img").css("top",lovetop);
        var loveleft = $(".lovebreak").find("img").css("left");
        loveleft = parseInt(loveleft)-150;
        loveleft = loveleft + "px";
        $(".lovebreak").find("img").css("left",loveleft);
        $(".lovebreak").find("img").animate({width:"-=300px",height:"-=300px",left:"+=150px",top:"+=150px",opacity:"0.1"},"slow",function(){
            $(".lovebreak").remove();
        });
        //数据库更新
        ajaxThumb(id,intCount);
        return;
	}

    //赞数+1
	intCount = intCount+1;
	var stringCount = intCount + "";
	//更新赞数
	$(obj).find("span").text(stringCount);
	//更换图片
	$(obj).find("img").attr("src","img/thumbup32.png");
	//动画效果
    var container = $(".main").children(".container");
    var love = $('<div class="love"><img src="img/love128.png"></div>');
    $(container).append(love);
    //爱心的top+scrollY
    var lovetop = $(".love").find("img").css("top");
    lovetop = parseInt(lovetop) + scrollY;
    lovetop = lovetop + "px";
    $(".love").find("img").css("top",lovetop);
    $(".love").find("img").animate({width:"+=300px",height:"+=300px",left:"-=150px",top:"-=150px",opacity:"0.1"},"slow",function(){
    	$(".love").remove();
	//数据库更新
	ajaxThumb(id,intCount);
	});

}
//网络请求-根据日期查询post
function ajaxPost(date){
    var url='librarys/'+date;
    $.ajax({
        url:url,
        type:"GET", 
        async:true,    
        data:{},
        timeout:5000,    
        dataType:"json",    
        success:function(data){
            updatePost(data);
        },
        error:function(data){
            
        },
    })
}
//网络请求-更新赞
function ajaxThumb(id,count){
    var url='librarys/'+id+'/thumb?count='+count;
    $.ajax({
        url:url,
        type:"POST",
        async:true,
        contentType: "application/json; charset=utf-8",
        data: {
		},
        timeout:5000,
        dataType:"json",
        success:function(data){
            if(data.code==200){
            }
        },
        error:function(data){
        },
    })
}
//更新数据
function updatePost(result){
    var container = $(".main").children(".container");
	//无数据拦截
	if (result.data.length < 1){
		// alert("无数据");
		var nodata = $('<div class="nodata"><span>------我是有底线的------</span></div>');
		$(container).append(nodata);
	}
	var header = '<div class="row clearfix postone">'
						+'<div class="col-md-12 col-xs-12 col-lg-12 column">'
						+'<div class="row clearfix">'
						+'<div class="col-md-2 col-xs-2 col-lg-2 column"></div>'
						+'<div class="col-md-8 col-xs-8 col-lg-8 column">'
							+'<div class="llzDaily">'
								+'<h3 class="date">'
								+'<span><img src="img/hot.png"/></span>'
								+'<em>每日推荐</em>'
								+'<small>'+result.data[0].date+'</small>'
								+'</h3>'
							+'</div>'
						+'</div>'
						+'<div class="col-md-2 col-xs-2 col-lg-2 column"></div>'
						+'</div>'
					+'<div class="posts">';
	var post = "";
	for(var i=0;i<result.data.length;i++){
		var click = "goUrl('"+result.data[i].url+"')";
		var imgurl = randIMG();
		var  id = result.data[i].id+"";
		var library = result.data[i];
		var thumbC = "thumbUp(this"+','+id+")";
		post +=	'<div class="post postHover" onmouseover="LLZmouseover(this)" onmouseout="LLZmouseout(this)">'
					+'<div class="row clearfix">'
						+'<div class="col-md-2 col-xs-2 col-lg-2 column">'
							+'<div class="userInfo">'
								+'<div><center><img src='+imgurl+'/><center>'
								+'</div>'
								+'<div><center><span>'+result.data[i].author+'</span><center>'
								+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="col-md-8 col-xs-8 col-lg-8 column">'
							+'<div class="content" onclick='+click+'>'
								+'<div><p>'+result.data[i].title+'</p>'
								+'</div>'
								+'<span>来源网站：<small>'+result.data[i].baseUrl+'</small></span>'
							+'</div>'
						+'</div>'
						+'<div class="col-md-2 col-xs-2 col-lg-2 column">'
							+'<div class="thumb btn-default" onclick='+thumbC+'>'
								+'<center><img src="img/thumb32.png"/></center>'
								+'<div><center><span>'+result.data[i].thumbCount+'</span></center>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>';
	}
	var end ='</div>'
			+'</div>'
			+'</div>'
			+'<div class="btn-default readmore" onclick="more(this)"><center><span>点我加载更多⬇</span></center></div>'
			+'</div>';
	var $content = $(header+post+end);
	$(container).append($content);
	
}
