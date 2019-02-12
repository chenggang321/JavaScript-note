/*
<script>元素
属性：
async：可选。表示应该立即下载脚本，但不妨碍页面中的其他操作。只对外部文件有效
charset：可选。通过src属性指定代码的字符集。大部分浏览器都会忽略他的值，很少有人用
defer:可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本有效
language:已废弃。原来用于表示编写代码的脚本语言
src:可选。表示包含要执行的外部文件
type:可选。可以看成是language的替代属性 虽然text/javascript 和 text/ecmascript都不
推荐使用，但大部分开发者依然使用。默认值为text/javascript

注意事项
在使用<script>嵌入javascript代码时，不要在代码中任何地方出现</script>字符串
如果要使用要通过转义字符"/" 可以解决

<noscript>元素
触发条件
浏览器不支持脚本
浏览器支持脚本，但脚本被禁用
*/
