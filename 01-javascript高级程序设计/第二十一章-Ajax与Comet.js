// XMLHttpRequest
// 创建
function createXHR(){
    if (typeof XMLHttpRequest !== "undefined"){
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== "undefined"){
        if (typeof arguments.callee.activeXString !== "string"){
            var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"],
                i, len;
            for (i=0,len=versions.length; i < len; i++){
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex){
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}
var xhr = createXHR();
xhr.open('get','example.php',false)
xhr.end(null)
/*
* responseText:作为响应主体被返回的文本
* responseXML
* status:响应的HTTP状态
* statusText：HTTP状态的说明
* */

var xhr = createXHR();
xhr.onload = function(event){
    if ((xhr.status >= 200 && xhr.status < 300) ||
        xhr.status === 304){
        alert(xhr.responseText);
    } else {
        alert("Request was unsuccessful: " + xhr.status);
    }
};
xhr.onprogress = function(event){
    var divStatus = document.getElementById("status");
    if (event.lengthComputable){
        divStatus.innerHTML = "Received " + event.position + " of " +
            event.totalSize +" bytes";
    }
};
xhr.open("get", "altevents.php", true);
xhr.send(null);