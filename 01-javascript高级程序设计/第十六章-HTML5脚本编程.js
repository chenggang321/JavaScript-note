// 跨文档信息传递
/*
*  postMessage() 参数信息 ，来自地点
* */
// 发送
// var iframeWindow = document.getElementById("myframe").contentWindow;
// iframeWindow.postMessage("A secret", "http://www.wrox.com");
// 接收
// EventUtil.addHandler(window, "message", function(event){
//     if (event.origin === "http://www.wrox.com"){
//         processMessage(event.data);
//         event.source.postMessage("Received!", "http://p2p.wrox.com");
//     }
// });

// 原生拖放
// 拖放事件
/*
* dragstart
* drag
* dragend
* */
// 当某个元素被拖放到一个有效的放置位置时依次发生以下事件
/*
* dragenter
* dragover
* dragleave
* */

// dataTransfer对象
/*
* getData()
* setData()
* dropEffect
* effectAllowed
* */

// 可拖动
/*
* draggable 可拖动
* */

// 媒体元素
/*
<!-- 嵌入视频 -->
<video src="conference.mpg" id="myVideo">Video player not available.</video>
<!-- 嵌入音频 -->
<audio src="song.mp3" id="myAudio">Audio player not available.</audio>
*/

// 历史状态管理
/*
*  history.pushState()
* */

/*
*  在使用html5的状态管理机制时，请确保使用pushState()创造的每一个假URL，在web服务
*  器上都有一个真的，实际存在的URL与之对应。否则，单击刷新按钮会导致404错误
* */




