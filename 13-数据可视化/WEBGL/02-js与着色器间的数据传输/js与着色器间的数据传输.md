# js与着色器间的数据传输

## js向attribute 变量传参的步骤
在顶点着色器中声明attribute 变量。
```html
<script id="vertexShader" type="x-shader/x-vertex">
    attribute vec4 a_Position;
    void main(){
        gl_Position = a_Position;
        gl_PointSize = 50.0;
    }
</script>
```
attribute 是存储限定符，是专门用于向外部导出与点位相关的对象的，这类似于es6模板语法中export 。
vec4 是变量类型，vec4是4维矢量对象。
a_Position 是变量名，之后在js中会根据这个变量名导入变量。这个变量名是一个指针，指向实际数据的存储位置。
也是说，我们如果在着色器外部改变了a_Position所指向的实际数据，那么在着色器中a_Position 所对应的数据也会修改。


在js中获取attribute 变量
```js
const a_Position=gl.getAttribLocation(gl.program,'a_Position');
```
js里不能直接写a_Position 来获取着色器中的变量。 因为着色器和js是两个不同的语言，
着色器无法通过window.a_Position 原理向全局暴露变量。 要在js 里获取着色器暴露的变量，
就需要找人来翻译，这个人就是程序对象。
gl 是webgl 的上下文对象。
gl.getAttribLocation() 是获取着色器中attribute 变量的方法。
getAttribLocation() 方法的参数中：
gl.program 是初始化着色器时，在上下文对象上挂载的程序对象。
'a_Position' 是着色器暴露出的变量名。


修改attribute 变量
```js
gl.vertexAttrib3f(a_Position,0.0,0.5,0.0);
```
attribute 变量即使在js中获取了，他也是一个只会说GLSL ES语言的人，他不认识js 语言，
所以不能用js的语法来修改attribute 变量的值：得用特gl.vertexAttrib3f方法改变a_Position的值：
gl.vertexAttrib3f() 方法的参数中：
a_Position 着色器变量。
后面的3个参数是顶点的x、y、z位置

a_Position被修改后，就可以使用上下文对象绘制最新的点位了。
```js
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 1);
```

# 用鼠标控制点位
要用鼠标控制一个点的位置，首先要知道鼠标点在webgl 坐标系中的位置，这样才能让一个点出现在我们鼠标点击的位置。

## 1-获取鼠标在canvas 画布中的css 位置
```js
canvas.addEventListener('click',function(event){
    const {clientX,clientY}=event;
    const {left,top}=canvas.getBoundingClientRect();
    const [cssX,cssY]=[
        clientX-left,
        clientY-top
    ];
})
```
使用方式理解 向量a(clientX,clientY)，向量b(left,top)
向量c=a-b=(clientX-left,clientY-top)
由向量的减法得：向量a减向量c，等于以向量c 的终点为起点，以向量a的终点为终点的向量c
向量c 视之为坐标点c，那点c 就是鼠标在canvas 画布中的位css位置
因为html 坐标系中的坐标原点和轴向与canvas 2d是一致的，所以在我们没有用css 改变画布大小，
也没有对其坐标系做变换的情况下，鼠标点在canvas 画布中的css 位就是鼠标点在canvas 2d坐标系中的位置。

## canvas 坐标系转webgl 坐标系

1.解决坐标原点位置的差异。(将原点移至canvas中心)
```js
const [halfWidth,halfHeight]=[width/2,height/2];
const [xBaseCenter,yBaseCenter]=[cssX-halfWidth,cssY-halfHeight];
```

2.解决y 方向的差异。(因为webgl 里的y 轴和canvas 2d 里的y轴相反，所以要对yBaseCenter 值取反。)
```js
const yBaseCenterTop=-yBaseCenter;
```

3.解决坐标基底的差异。(由于canvas 2d 的坐标基底中的两个分量分别是一个像素的宽高，
而webgl的坐标基底的两个分量是占画布的宽高的比例，所得求个比值。)
```js
const [x,y]=[xBaseCenter/halfWidth,yBaseCenterTop/halfHeight]
```

# 用鼠标绘制星空

## 1-用鼠标绘制圆形的顶点
```html
<script id="fragmentShader" type="x-shader/x-fragment">
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
        if(dist < 0.5) {
            gl_FragColor = u_FragColor;
        } else {
            discard;
        }
    }
</script>
```
distance(p1,p2) 计算两个点位的距离
gl_PointCoord 片元在一个点中的位置，此位置是被归一化的
discard 丢弃，即不会一个片元进行渲染

## 2-绘制随机透明度的星星
开启片元的颜色合成功能
```js
gl.enable(gl.BLEND)
```

设置片元的合成方式
```js
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
```

## 制作闪烁的繁星





