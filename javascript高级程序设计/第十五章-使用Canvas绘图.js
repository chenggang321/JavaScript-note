// 基本用法
// 创建
// <canvas id="drawing" width=" 200" height="200">A drawing of something.</canvas>

// 填充和描边
/*
*  fillStyle 填充颜色
*  strokeStyle 描边
* */

// dom创建
var canvas = document.createElement('canvas')
canvas.width = 400
canvas.height = 400
canvas.background = '#ddd'
document.body.appendChild(canvas)
// 获取上下文对象
var ctx = canvas.getContext("2d")
function clearCanvas(){
    // 清空画布
    ctx.clearRect(0,0,400,400)
}

// 绘制矩形
/*
* fillRect()
* strokeRect()
* clearRect()
* lineWidth 描边宽度
* */
ctx.strokeStyle = "#f00"

ctx.fillStyle = '#0000ff'
ctx.fillRect(10,10,50,50)
ctx.strokeRect(10,10,50,50)

ctx.fillStyle = 'rgba(0,0,255,0.5)'
ctx.fillRect(30,30,50,50)
ctx.strokeRect(30,30,50,50)

// 清除一个小矩形
ctx.clearRect(40,40,10,10)

// 清空画布
clearCanvas()

// 绘制路径
/*
* beginPath() 开始绘制新路径
* arc(x, y, radius, startAngle, endAngle, counterclockwise) 最后一个参数
* 绘制方向 false 顺时针
* arcTo(x1, y1, x2, y2, radius) 从上一点绘制一条弧线
* lineTo(x, y) 从上一点开始绘制一条直线
* moveTo(x, y) 将绘图游标移动到（x,y）不划线
* quadraticCurveTo(cx, cy, x, y) 从上一点绘制一条二次曲线
* rect(x, y, width, height) 绘制矩形
*
*
* 创建了路径后，可以调用closePath() 绘制一条连接到起点的线条
* fill() 填充
* stroke() 描边
* clip() 在路径上创建一个剪切区域
* isPointInPath(x,y) 判断点是否在路径上
* */

//开始路径
ctx.beginPath()

// 绘制外圆
ctx.arc(100,100,99,0,2*Math.PI,false)

// 绘制内圆
ctx.moveTo(194,100)
ctx.arc(100,100,94,0,2*Math.PI,false)

// 绘制分针
ctx.moveTo(100,100)
ctx.lineTo(100,15)

// 绘制时针
ctx.moveTo(100,100)
ctx.lineTo(35,100)

// 描边路径
ctx.stroke()

// 清空画布
clearCanvas()

// 测试closePath()
//开始路径
ctx.beginPath()

// 绘制半圆
ctx.arc(100,100,99,0,Math.PI,false)

ctx.closePath()

// 描边路径
ctx.stroke()

// 清空画布
clearCanvas()

// 绘制文本
/*
* fillText('text',x,y)
* strokeText()
* font
* textAlign
* textBaseline 文本基线
* measureText('text')
* */

// 变换
/*
* rotate(angle)
* scale(scaleX, scaleY)
* translate(x, y)
* transform(m1_1, m1_2, m2_1, m2_2, dx, dy)
* setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy)
* */

// 绘制图像
/*
* drawImage()
* */
// var image = document.images[0];
// context.drawImage(image, 10, 10);

// 阴影
/*
* shadowColor
* shadowOffsetX
* shadowOffsetY
* shadowBlur
* */

// 渐变
/*
*  createLinearGradient() 线性渐变
*  createRadialGradient() 径向渐变
*  addColorStop() 指定色标
* */

// 模式
/*
* createPattern()
* */

// 使用图像数据
/*
* getImageData() 取得原始图像数据
* */

// 合成
/*
* globalAlpha 透明度
* globalComposition-Operation 图像结合方式
*  source-over
*  source-in
*  source-out
*  source-atop
*  destination-over
*  destination-in
*  destination-out
*  destination-atop
*  lighter
*  copy
*  xor
* */

// WebGl(Canvas 的3d上下文)


