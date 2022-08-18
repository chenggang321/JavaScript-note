const defAttr=()=>({
  gl:null, // webgl
  vertices:[], // 顶点数据集合
  geoData:[], // 模型数据，对象数组，可解析出vertices 顶点数据
  size:2, // 顶点分量的数目
  attrName:'a_Position', // attribute变量
  uniName:'u_IsPOINTS', // uniform变量
  count:0, // 顶点数量
  types: ['POINTS'], // 绘图方式，可以用多种方式绘图
  circleDot: false,
  u_IsPOINTS:null
})
/**
 * 多边形对象
 */
export default class Poly{
  constructor(attr){
    Object.assign(this,defAttr(),attr)
    this.init()
  }
  init(){
    const {attrName,size,gl,circleDot}=this
    if(!gl){return}
    //缓冲对象
    const vertexBuffer = gl.createBuffer();
    //绑定缓冲对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //写入数据
    this.updateBuffer()
    //获取attribute 变量
    const a_Position=gl.getAttribLocation(gl.program, attrName)
    //修改attribute 变量
    gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
    //赋能-批处理
    gl.enableVertexAttribArray(a_Position)
    //如果是圆点，就获取一下uniform 变量
    if (circleDot) {
      this.u_IsPOINTS=gl.getUniformLocation(gl.program, 'u_IsPOINTS')
    }
  }

  // 更新缓冲区数据，同时更新顶点数量
  updateBuffer(){
    const {gl,vertices}=this
    this.updateCount()
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW)
  }
  // 更新顶点数量
  updateCount(){
    this.count=this.vertices.length/this.size
  }
  // addVertice
  addVertice(...params){
    this.vertices.push(...params)
    this.updateBuffer()
  }
  // 删除最后一个顶点
  popVertice(){
    const {vertices,size}=this
    const len=vertices.length
    vertices.splice(len-size,len)
    this.updateCount()
  }
  // 根据索引位置设置顶点
  setVertice(ind,...params){
    const {vertices,size}=this
    const i=ind*size
    params.forEach((param,paramInd)=>{
      vertices[i+paramInd]=param
    })
  }
  // 基于geoData 解析出vetices 数据
  updateVertices(params){
    const {geoData}=this
    const vertices=[]
    geoData.forEach(data=>{
      params.forEach(key=>{
        vertices.push(data[key])
      })
    })
    this.vertices=vertices
  }
  // 绘图方法
  draw(types=this.types){
    const {gl,count,circleDot,u_IsPOINTS}=this
    for (let type of types) {
      circleDot&&gl.uniform1f(u_IsPOINTS,type==='POINTS')
      gl.drawArrays(gl[type],0,count);
    }
  }
}
