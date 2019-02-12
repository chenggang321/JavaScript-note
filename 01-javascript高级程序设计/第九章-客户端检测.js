// 能力检测
/*
* 在实际开发中，应该讲能力检测作为确定下一步解决方案的依据，而不是用它来判断浏览器
* */

// 怪癖检测

// 用户代理检测

// 用户代理字符串检测技术（navigator.userAgent）

var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
alert(JSON.stringify(browser));
if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    if (ua.match(/MicroMessenger/i) === "micromessenger") {
        //在微信中打开
        alert("微信");
    }else if(ua.match(/QQ/i) === "qq"){
        alert("qq");
    }
    if (ua.match(/WeiBo/i) === "weibo") {
        //在新浪微博客户端打开
        alert("新浪微博客户端");
    }
    if (browser.versions.ios) {
        //是否在IOS浏览器打开
        alert("ios");
    }
    if(browser.versions.android){
        //是否在安卓浏览器打开
        alert("安卓浏览器");
    }
}else {
    //否则就是PC浏览器打开
    alert("pc");
}