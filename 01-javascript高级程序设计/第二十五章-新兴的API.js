// requestAnimationFrame()
var div = document.createElement('div')
div.style.width = '400px'
div.style.height = '400px'
div.style.background = 'lightblue'
div.style.position = 'absolute'
document.body.appendChild(div)
;(function () {
    function draw() {
        // page change
        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
})()

// Page Visibility API

// Geolocation API
// navigator.geolocation
/*
* getCurrentPosition()
* watchPosition()
* clearWatch()
* */

// file API
/*
*  name
*  size
*  type
*  lastModifiedDate
* */
// FileReader 类型
/*
*  readAsText(file,encoding) 以纯文本形式读取文件
*  readAsDataURL(file) 读取文件并将文件以数据URI的形式保存在result属性中
*  readAsBinaryString(file) 读取文件并将一个字符串保存在result属性中
*  readyAsArrayBuffer(file) 读取文件并将一个文件内容的ArrayBuffer保存在result属性中
* */

// 读取部分内容
function blobSlice(blob, startByte, length) {
    if (blob.slice) {
        return blob.slice(startByte, length);
    } else if (blob.webkitSlice) {
        return blob.webkitSlice(startByte, length);
    } else if (blob.mozSlice) {
        return blob.mozSlice(startByte, length);
    } else {
        return null;
    }
}

// 对象URL
function createObjectURL(blob) {
    if (window.URL) {
        return window.URL.createObjectURL(blob);
    } else if (window.webkitURL) {
        return window.webkitURL.createObjectURL(blob);
    } else {
        return null;
    }
}

div.draggable = true

var dragDiff = {}
function dargstart(e){
    dragDiff = {
        x: e.offsetX,
        y: e.offsetY
    }
}
function dargmove(e){
    e.preventDefault()
    setPosition(e.target,e.clientX - dragDiff.x,e.clientY - dragDiff.y)
}
function dargend(e){
    e.preventDefault()
    setPosition(e.target,e.clientX - dragDiff.x,e.clientY - dragDiff.y)
}
function setPosition(ele,x,y){
    ele.style.left = x + 'px'
    ele.style.top = y + 'px'
}
// 读取拖放的文件
div.addEventListener('dragstart', dargstart)
div.addEventListener('drag',dargmove)
div.addEventListener('dragend', dargend)

// 拖拽ajax上传
/*var droptarget = document.getElementById("droptarget");
function handleEvent(event){
    var info = "",
        output = document.getElementById("output"),
        data, xhr,
        files, i, len;
    EventUtil.preventDefault(event);
    if (event.type === "drop"){
        data = new FormData();
        files = event.dataTransfer.files;
        i = 0;
        len = files.length;
        while (i < len){
            data.append("file" + i, files[i]);
            i++;
        }
        xhr = new XMLHttpRequest();
        xhr.open("post", "FileAPIExample06Upload.php", true);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                alert(xhr.responseText);
            }
        };
        xhr.send(data);
    }
}
EventUtil.addHandler(droptarget, "dragenter", handleEvent);
EventUtil.addHandler(droptarget, "dragover", handleEvent);
EventUtil.addHandler(droptarget, "drop", handleEvent);*/

// web 计时

// web worker
var option = 'name'
var object = {[option]:'aaa'}
console.log(object)


