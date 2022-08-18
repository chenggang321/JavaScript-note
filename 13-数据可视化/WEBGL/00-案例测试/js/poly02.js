/*
attributes 数据结构:{
  a_Position: {
    size: 3, // 一个顶点所有数据的个数。必须是 1、2、3、4。
    index:0 // 在source中属性开始数据位置
  }
}
uniforms 数据结构:{
  u_Color: {
    // 数据类型 uniform1fv uniform2fv uniform3fv uniform4fv
    // void uniform[1234][fi](uint location, ...)
    // void uniform[1234][fi]v(uint location, Array value)
    // void uniformMatrix[234]fv(uint location, bool transpose, Array) 矩阵
    // 1234 = 尺寸 f = 浮动 i = 整数 v 最后一个字符（如果存在）是 v，表示该命令采用值的数组（向量）而不是一系列单独的参数
    type: 'uniform1f',
    value:1 // 数据值
  },
}
maps 数据结构:{
  u_Sampler:{
    image,
    format,
    wrapS,
    wrapT,
    magFilter,
    minFilter
  },
}
*/
const defAttr = () => ({
  gl: null,  // webgl上下文对象
  type: 'POINTS', // 绘图方式
  source: [], // 顶点数据
  sourceSize: 0,  // 绘制图形的顶点数
  elementBytes: 4, // 单位数组字节偏移量。
  categorySize: 0, // 属性占有的总的字节数
  attributes: {}, // attributes属性
  uniforms: {}, // uniforms属性
  maps: {}
})

// 多边形对象
export default class Poly {
  constructor(attr) {
    Object.assign(this, defAttr(), attr)
    this.init()
  }

  init() {
    if (!this.gl) {
      return
    }
    // 计算数据大小
    this.calculateSize()
    // 设置Attribute
    this.updateAttribute();
    // 设置Uniform
    this.updateUniform();
    this.updateMaps()
  }

  calculateSize() {
    const {attributes, elementBytes, source} = this
    let categorySize = 0
    Object.values(attributes).forEach(ele => {
      const {size, index} = ele
      categorySize += size
      ele.byteIndex = index * elementBytes
    })
    this.categorySize = categorySize
    this.categoryBytes = categorySize * elementBytes
    this.sourceSize = source.length / categorySize
  }

  updateAttribute() {
    const {gl, attributes, categoryBytes, source} = this
    // 创建缓冲对象
    const sourceBuffer = gl.createBuffer();
    //绑定缓冲对象
    gl.bindBuffer(gl.ARRAY_BUFFER, sourceBuffer);
    //写入数据
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(source), gl.STATIC_DRAW)
    for (let [key, {size, byteIndex}] of Object.entries(attributes)) {
      /*
          获取着色器中声明的变量，然后对其进行赋值 返回变量索引
          getAttribLocation(program: WebGLProgram, name: string): GLint;
          program 指定包含顶点着色器的着色器程序对象
          name 变量名称
       */
      const attr = gl.getAttribLocation(gl.program, key)
      /*
          设置着色器属性
          vertexAttribPointer(index: GLuint, size: GLint, type: GLenum, normalized: GLboolean, stride: GLsizei, offset: GLintptr): void;
          index: 指定属性的索引。
          size: 属性数据个数。必须是 1、2、3、4。
          type: 指定数组中每个组件的数据类型。
          normalized: 对于 glVertexAttribPointer，指定在访问定点数据值时是否应归一化(GL_TRUE)或直接转换为定点值 (GL_FALSE)。
          stride: 指定连续通用顶点属性之间的字节偏移量（属性占有的总的字节数）。如果 stride 为 0，则通用顶点属性被理解为紧密封装在数组中。初始值为0。
          offset：表示位置数据在缓冲区起始位置的偏移量。
       */
      gl.vertexAttribPointer(
        attr,
        size,
        gl.FLOAT,
        false,
        categoryBytes,
        byteIndex
      )
      // 应用属性
      gl.enableVertexAttribArray(attr)
    }
  }

  updateUniform() {
    const {gl, uniforms} = this
    for (let [key, val] of Object.entries(uniforms)) {
      const {type, value} = val
      /*
      获取着色器中声明的Uniform变量，然后对其进行赋值 返回变量索引
      getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null;
      program:指定包含顶点着色器和片元着色器的着色器程序对象
      name:变量名称
       */
      const u = gl.getUniformLocation(gl.program, key)
      if (type.includes('Matrix')) {
        gl[type](u, false, value)
      } else {
        gl[type](u, value)
      }
    }
  }

  updateMaps() {
    const {gl, maps} = this
    Object.entries(maps).forEach(([key, val], ind) => {
      const {
        format = gl.RGB,
        image,
        wrapS,
        wrapT,
        magFilter,
        minFilter
      } = val
/*
    pixelStorei(pname: GLenum, param: GLint | GLboolean): void;

 */
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      gl.activeTexture(gl[`TEXTURE${ind}`])
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        format,
        format,
        gl.UNSIGNED_BYTE,
        image
      )

      wrapS && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        wrapS
      )
      wrapT && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        wrapT
      )

      magFilter && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        magFilter
      )

      if (!minFilter || minFilter > 9729) {
        gl.generateMipmap(gl.TEXTURE_2D)
      }

      minFilter && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        minFilter
      )

      const u = gl.getUniformLocation(gl.program, key)
      gl.uniform1i(u, ind)
    })
  }

  draw(type = this.type) {
    const {gl, sourceSize} = this
    /*
    drawArrays(mode: GLenum, first: GLint, count: GLsizei): void;
    mode: 画图函数，告诉系统你要画点、线，还是三角形；
    first: 指定第几顶点开始绘制的位置；
    count: 绘制图形的顶点数。
     */
    gl.drawArrays(gl[type], 0, sourceSize);
  }
}
