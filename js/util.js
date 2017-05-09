/**
 * Created by Administrator on 2016/7/30 0030.
 */

window.onload=function(){

    util.init()
};
var util={
    /*高度*/
    clientH:function(){
        this.id("container").style.height= this.id("root").clientHeight+"px"
    },
    /*做兼容*/
    setOpacity:function(Element,opacity){
        if (Element.style.opacity != undefined) {
            ///兼容FF和GG和新版本IE
            Element.style.opacity = opacity / 100;
        } else {
            ///兼容老版本ie
            Element.style.filter = "alpha(opacity=" + opacity + ")";
        }
    },
    /*获取id*/
    id:function(name){
        return document.getElementById(name);
    },
    /*
     *渐显效果 fadein
     * Element 元素
     * opacity 淡入到指定的透明度,0~100(可选)
     * speed 渐显 速度
     * */
    fadein:function(Element,opacity,speed){
        var _speed = speed || 20;
        var _opacity = opacity || 100;
        //显示元素,并将元素值为0透明度(不可见)
        Element.style.display = 'block';
        this.setOpacity(Element,0);
        var val = 0;
        var _this=this;
        //循环将透明值以5递增,即淡入效果
        (function(){
            _this.setOpacity(Element, val);
            val += 5;
            if (val <= _opacity) {
                setTimeout(arguments.callee, _speed)
            }
        })();
    },
    /*
     * 渐出效果  fadeout
     * Element 元素
     * opacity 值
     * speed 渐显 速度
     */
    fadeout:function(Element,opacity,speed){
        var  _speed = speed || 20;
        var _opacity = opacity || 0;
        //初始化透明度变化值为0
        var val = 100;
        var _this=this;
        var time;
        //循环将透明值以5递减,即淡出效果
        (function(){
            _this.setOpacity(Element, val);
            val -= 5;
            if (val >= _opacity) {
                time=setTimeout(arguments.callee, _speed);
            }else if (val < 0) {
                clearTimeout(time);
                //元素透明度为0后隐藏元素
                Element.style.display='none'
            }
        })();
    },
    /*
     * 从网上搜集
     * 冯义军 获取class 方法
     * */
    getElementsByClass:function (cName ,tagName) {
        var elements = tagName ? document.getElementsByTagName(tagName) : document.getElementsByTagName('*');
        var findEles = [];
        var reg = new RegExp('^'+cName+'\\s*|\\s+'+cName+'\\s+|\\s+'+cName+'$');
        for(var i=0;i<elements.length;i++) {
            if(reg.test(elements[i].className))findEles.push(elements[i]);
        }
        return findEles;
    },
    /*初始化*/
    init:function(){
        this.clientH();/*视口的高度赋给container的高度*/
        this.init_Page();/*界面*/
        this.audio_btn(1);/*开关*/
        this.tip_btn()
    },
    /*界面*/
    init_Page:function(){
        var _this=this;
        var times = setInterval(function(){
            if(_this.id("loading").style.display!="none"){
                _this.fadeout(_this.id("loading"));/*初始化*/
            }else{
                _this.fadein(_this.id("introductionOnePage"));/*加载第一页*/
                _this.init_audio(1);/*舒适化音乐开启*/
                _this.onePageText_1();/*页面文字动态效果*/
                clearInterval(times)
            }
        },2000);
    },
    /*音乐初始*/
    init_audio:function(num){
        var audio;
        if(num==1){
            audio=this.id("introduction-audio");

        }else if(num==2){
            this.id("introduction-audio").pause();/*停止播放*/
            audio=this.id("big-scene-audio");
        }else{
            this.id("introduction-audio").pause();
            audio=this.id("btn-audio")
        }
        if(audio.paused){
            audio.play();// 这个就是播放
        }else{
            audio.pause();// 这个就是暂停
        }

    },
    /*音乐开关*/
    audio_btn:function(num){
        var _this=this;
        var t=true;
        var audio;
        if(num==1){
            audio=this.id("introduction-audio");
        }else{
            audio=this.id("big-scene-audio")
        }
        var audio_btn=this.getElementsByClass("audio-btn","div");
        for(var i=0;i<audio_btn.length;i++){
            audio_btn[i].onclick=function(){
                if(t==true){
                    this.setAttribute("class","audio-btn ");
                    t=false
                }else{
                    this.setAttribute("class","audio-btn active");
                    t=true
                }
                if(audio!==null){
                    //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
                    if(audio.paused)                     {
                        audio.play();//audio.play();// 这个就是播放
                    }else{
                        audio.pause();// 这个就是暂停
                    }
                }
            }
        }
    },
    /*文字1*/
    onePageText_1:function(){
        var _this=this;
        var time;
        var j=-1;
        var text1=this.id("text_1");/*父元素*/
        var text2=this.id("text_2");/*父元素*/
        var text1Children=text1.getElementsByTagName("div");/*子元素*/
        var text2Children=text2.getElementsByTagName("div");/*子元素*/
        /*初始状态 隐藏子元素*/
        for(var i=0;i<text1Children.length;i++){
            text1Children[i].style.display="none";
        }
        for(var b=0;b<text2Children.length;b++){
            text2Children[b].style.display="none";
        }
        time = setInterval(function(){
            if(j===text1Children.length-1){
                clearInterval(time);
                _this.fadeout(_this.id("text_1"));
                setTimeout(function(){
                    _this.fadein(text2);
                    _this.onePageText_2(text2Children)
                },300)

            }else{
                j++;
                _this.fadein(text1Children[j])
            }
        },1500)
    },
    /*文字2*/
    onePageText_2:function(children){
        var _this=this;
        var j=-1;
        var time=setInterval(
            function(){
                if(j==children.length-1){
                    clearInterval(time);
                    _this.fadeout(_this.id("introductionOnePage"));/*第一页淡出*/
                    setTimeout(function(){
                        _this.fadein(_this.id("introductionTwoPage"));/*第二页淡入*/
                        _this.explore_hammer();/*探索未来按钮*/
                    },3000)
                }else{
                    j++;
                    _this.fadein(children[j])
                }
            },1500
        )
    },
    /*探索未来按钮*/
    explore_hammer:function(){
        var explore_btn=this.id("explore-btn");/*未来按钮*/
        var earth=this.id("earth");/*地球*/
        var _this=this;
        /*延迟 探索未来按钮 淡入*/
        setTimeout(function(){
            _this.fadein(explore_btn)
        },2000);
        /*点击 按钮 地球动画开始
         * 第二页面1s 之后淡出
         * */
        explore_btn.onclick=function(){
            earth.setAttribute("class","earth earth-animate");
            setTimeout(function(){
                _this.fadeout(_this.id("introductionTwoPage"));
                _this.ThreePage();
            },1000)
        }
    },
    /*加载页面三*/
    ThreePage:function(){
        var layer=this.id("layer");
        var _this=this;
        setTimeout(function(){
            _this.fadein(_this.id("introductionThreePage"));
            /*添加一个值 切换 声音 声音按钮*/
            _this.init_audio(2);
            _this.audio_btn(2);
        },3000);
        /*调用手指事件*/
        this.touchScroll();
        /*按钮*/
        this.tip_btn()
    },
    /*手指事件*/
    touchScroll:function(){
        var w=document.documentElement.clientWidth; /*获取根元素 适口宽度*/
        var moveAlpha = 0; // 初始化设备移动的距离
        var  startx; /*开始初始值*/
        var  isMove;/*判断用*/
        var  num=8; /*数值*/
        var _this=this;
        /*引入hammer.js
        * http://hammerjs.github.io/ 官网
        * 轻量级框架 可以不依赖任何框架
        * 推荐  ★★★★*/
        var bigSceneHammer = new Hammer(util.id("scrollX"));
        bigSceneHammer.on('panstart',function(event) {
            isMove = true;
            startx=moveAlpha /*赋值*/
        });
        bigSceneHammer.on('panmove',function(event) {
            if(isMove){
                moveAlpha = event.deltaX+startx;
                /*大于根元素的宽度
                * 淡出*/
                if (moveAlpha <= -w) {
                  _this.fadeout(_this.id('text-in-cloud'));
                  _this.fadeout(_this.id('slide-tips'));
                }
                /* w*8
                 * 高好到往左移动的最大值*/
                if (moveAlpha < -(w * num)) {
                    moveAlpha = -(w * num);
                }
                /*大于0
                 * 超出右移动最大值*/
                if (moveAlpha > 0) {
                    moveAlpha = 0;
                }
                util.id("scrollX").style.transform= 'translate3d(' + moveAlpha + 'px, 0, 0)';
                util.id("scrollX").style.WebkitTransform= 'translate3d(' +moveAlpha + 'px, 0, 0)'
            }
        });
        bigSceneHammer.on('panend',function(event) {
            isMove = false;
        });
    },
    /*按钮*/
    tip_btn:function(){
      var tips=this.getElementsByClass("tip","div"); /*获取按钮tip*/
        var _this=this;
       /*循环tips
       * 绑定 点击事件*/
        for(var i=0;i<tips.length;i++){
            tips[i].index=i;/*赋 index*/
            tips[i].onclick=function(){
                /*调用 弹出消息框
                 *传index值*/
                _this.alertInfo(this.index)
            }
        }
    },
    /*弹出消息框*/
    alertInfo:function(i){
        var alerts=this.getElementsByClass("tan_",'div');/*消息*/
        var close=this.getElementsByClass("go-btn",'div')[i];/*关闭按钮*/
        var man=this.id("opacity");
        this.init_audio(3);/*初始化音乐*/
        man.style.display='block';
        alerts[i].style.display="block";
        /*关闭*/
            close.onclick=function(){
                man.style.display='none';
                alerts[i].style.display="none";
        }
    }
};

