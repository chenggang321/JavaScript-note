// 离线检测
// navigator.onLine
// h5 事件
/*
* online 在线
* offline 离线
* */
/*
*  为了检测应用是否离线，在页面加载后，最好先通过navigation.inLine取得初始状态。然后通过上述
*  两个事件来确定网络连接状态的变化
* */

// 应用缓存(application cache)
// 头部加入
// <html manifest = "cache.manifest">
// cache.manifest 文件内容
/*
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
resourse/logo.png
FALLBACK:
//offline.html
*/
/*
*  CACHE：表示需要离线存储的资源列表，由于包含manifest文件的页面将被自动离线存储，
*  所以不需要把页面自身也列出来
* NETWORK：表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，
* 所以在离线情况下无法使用这些资源。不过，如果在CACHE和NETWORK中有一个相同的资源，
* 那么这个资源还是会被离线存储，也就是说CACHE的优先级更高。
* FALLBACK：表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个
* 文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问offline.html。
* */
// applicationCache对象
/*
* status:0,无缓存；1，闲置；2，检查中；3，下载中；4，更新完成；5，废弃
*事件
* checking：浏览器为应用缓存查找跟新时触发
* error:在检查跟新或下载资源期间发生错误时触发
* noupdate:在检查描述文件无变化时触发
* downloading：在开始下载应用缓存资源时触发
* progress:在下载应用缓存时持续不断触发
* updateready:在页面新的应用缓存下载完毕可以通过swapCache()使用时触发
* cached：在应用缓存完整可用时触发
* 方法
* update() 跟新缓存
* swapCache() 启用新应用缓存
* */

// 数据存储
// cookie
var CookieUtil = {
    // 读取cookie
    get: function (name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd === -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
                + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    // 设置cookie
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" +
            encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    // 清除 cookie
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }
};

//设置cookie
CookieUtil.set("name", "Nicholas");
CookieUtil.set("book", "Professional JavaScript");
//读取 cookie 的值
alert(CookieUtil.get("name")); //"Nicholas"
alert(CookieUtil.get("book")); //"Professional JavaScript"
//删除cookie
CookieUtil.unset("name");
CookieUtil.unset("book");

//设置 cookie包括它的路径、域、失效日期
CookieUtil.set("name", "Nicholas", "/books/projs/", "www.wrox.com",
    new Date("January 1, 2010"));
//删除刚刚设置的 cookie
CookieUtil.unset("name", "/books/projs/", "www.wrox.com");
//设置安全的cookie
CookieUtil.set("name", "Nicholas", null, null, null, true);

// web存储机制
// Storage 类型
/*
*  clear() 删除所有值
*  getItem(name) 根据指定的名字name获取对应的值
*  key(index) 获得index位置处的值的名字
*  removeItem(name) 删除由name指定的名字的值
*  key(index) 获得index位置处的值的名字
*  setItem(name,value) 为指定的name设置一个对应的值
* */

// sessionStorage 对象
/*
* 存储特定于某个会话的数据，也就是该数据只保持到浏览器关闭。是Storage的一个实例
* */

//globalStorage
//localStorage
/*
* 数据保留到通过javascript删除或者是用户清除浏览器缓存
* */

// 为了兼容只支持globalStorage的浏览器
function getLocalStorage(){
    if (typeof localStorage === "object"){
        return localStorage;
    } else if (typeof globalStorage === "object"){
        return globalStorage[location.host];
    } else {
        throw new Error("Local storage not available.");
    }
}

// storage 事件
/*
*  domain 发生变化的存储空间的域名
*  key 设置或删除的键名
*  newValue 如果是设置值，则是新值；如果是删除键，则是null
*  oldValue 键被更改之前的值
* */
// 限制
// 对于localStorage,大多数桌面浏览器会设置来源5MB的限制，chrome和Safari对每个来源的限制
// 是2.5MB.ios 和 Android 版的限制也是2.5MB

// indexedDB


