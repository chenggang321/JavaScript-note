/*
data 的数据结构：
{
  a_Position: {
    array:类型数组,
    size:矢量长度,
    buffer:缓冲对象,
    location:attribute变量,
    needUpdate：true
  },
  a_Color: {
    array:类型数组,
    size:矢量长度,
    buffer:缓冲对象,
    location:attribute变量,
    needUpdate：true
  },
  ……
}
array 存储所有的attribute 数据
size 构成一个顶点的所有分量的数目
buffer 用createBuffer() 方法建立的缓冲对象
location 用getAttribLocation() 方法获取的attribute变量
needUpdate 在连续渲染时，是否更新缓冲对象

index 数据结构
{
    array:类型数组,
    buffer:缓冲对象,
    needUpdate：true
}
 */
const defAttr = () => ({
  data: {}, // 顶点数据
  count: 0, // 顶点总数
  /*
  顶点索引数据
  默认为null，用drawArrays 的方式绘图
  若不为null，用drawElements 的方式绘图
   */
  index: null,
  /*
  drawType 绘图方式
  drawArrays 使用顶点集合绘图，默认
  drawElements，使用顶点索引绘图
   */
  drawType:'drawArrays'
})
export default class Geo{
  constructor(attr){
    Object.assign(this,defAttr(),attr)
  }
  init(gl,program){
    gl.useProgram(program)
    this.initData(gl, program)
    this.initIndex(gl)
  }
  initData(gl,program) {
    for (let [key, attr] of Object.entries(this.data)) {
      attr.buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, attr.array, gl.STATIC_DRAW)
      const location = gl.getAttribLocation(program, key)
      gl.vertexAttribPointer(location, attr.size, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(location)
      attr.location=location
    }
  }
  initIndex(gl) {
    const { index } = this
    if (index) {
      this.count = index.array.length
      this.drawType='drawElements'
      index.buffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index.buffer)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,index.array,gl.STATIC_DRAW)
    } else {
      const { array, size } = this.data['a_Position']
      this.count = array.length / size
      this.drawType='drawArrays'
    }
  }
  update(gl) {
    this.updateData(gl)
    this.updateIndex(gl)
  }
  updateData(gl) {
    for (let attr of Object.values(this.data)) {
      const {buffer,location,size,needUpdate,array}=attr
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
      if (needUpdate) {
        attr.needUpdate = false
        gl.bufferData(gl.ARRAY_BUFFER,array,gl.STATIC_DRAW)
      }
      gl.vertexAttribPointer(location,size,gl.FLOAT,false,0,0)
    }
  }
  updateIndex(gl) {
    const { index } = this
    if (index) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index.buffer)
      if (index.needUpdate) {
        index.needUpdate = false
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,index.array,gl.STATIC_DRAW)
      }
    }
  }
  setData(key,val) {
    const obj = this.data[key]
    if(!obj){return}
    obj.needUpdate = true
    Object.assign(obj,val)
  }
  setIndex(val) {
    const { index } = this
    if (val) {
      index.needUpdate = true
      index.array=val
      this.count = val.length
      this.drawType='drawElements'
    } else {
      const {array,size}=this.data['a_Position']
      this.count=array.length/size
      this.drawType='drawArrays'
    }
  }
}