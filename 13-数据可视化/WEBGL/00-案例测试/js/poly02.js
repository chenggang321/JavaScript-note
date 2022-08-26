/*
attributes 数据结构:{
  a_Position: { // a_Position 对应attribute变量名
    size: 3, // 一个顶点所有数据的个数。必须是 1、2、3、4。(系列尺寸)
    index:0 // 在source中属性开始数据位置 (系列的元素索引位置)
  }
}
uniforms 数据结构:{
  u_Color: { // u_Color 对应uniform变量名
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
    image, // 图形源
    format, // 数据类型，默认gl.RGB
    // TEXTURE_WRAP_S和TEXTURE_WRAP_T 就是纹理容器在s方向和t方向的尺寸，这里的s、t就是st坐标系里的s、t，st坐标系和uv坐标系是一回事
    // CLAMP_TO_EDGE 翻译过来就是边缘夹紧的意思，可以理解为任意尺寸的图像源都可以被宽高为1的uv尺寸夹紧。
    // 注：只有CLAMP_TO_EDGE 才能实现非二次幂图像源的显示，其它的参数都不可以
    // REPEAT 重复
    // MIRRORED_REPEAT 镜像复制
    // CLAMP_TO_EDGE 只对某一个方向纹理镜像复制
    wrapS, // 对应纹理对象的TEXTURE_WRAP_S 属性
    wrapT, // 对应纹理对象的TEXTURE_WRAP_T 属性
    // 对应纹理对象的TEXTURE_MAG_FILTER(纹理放大滤波器，是纹理在webgl图形中被放大的情况) 属性
    LINEAR (默认值) ，线性滤镜， 获取纹理坐标点附近4个像素的加权平均值，效果平滑
    NEAREST 最近滤镜， 获得最靠近纹理坐标点的像素 ，效果锐利
    magFilter,
    // 对应纹理对象的TEXTURE_MIN_FILTER(纹理缩小滤波器，是纹理在webgl图形中被缩小的情况)属性
    // LINEAR 线性滤镜，获取纹理坐标点附近4个像素的加权平均值，效果平滑
    // NEAREST 最近滤镜， 获得最靠近纹理坐标点的像素，效果锐利
    // NEAREST_MIPMAP_NEAREST 获得最靠近纹理坐标点的像素并执行最近邻过滤
    // NEAREST_MIPMAP_LINEAR (默认值) 获得最靠近纹理坐标点的像素执行线性插值
    // LINEAR_MIPMAP_NEAREST 获得最靠近纹理坐标点的像素并在其中执行线性过滤。
    // LINEAR_MIPMAP_LINEAR 在纹理坐标点的像素之间执行线性插值并执行线性过滤：也称为三线性过滤。
    // 注：后面这4个与分子贴图相关的参数适合比较大的贴图，若是比较小的贴图，使用LINEAR 或NEAREST 就好。
    // 注：缩小滤波器的默认值取色方法是NEAREST_MIPMAP_LINEAR ，这个方法会从分子贴图里找分子图像，然后从其中取色，然而当我们没有使用gl.generateMipmap()
    // 方法建立分子贴图的时候，就得给它一个不需要从分子贴图中去色的方法，如LINEAR或NEAREST。
    minFilter
  },
}
*/
const defAttr = () => ({
  gl: null,  // webgl上下文对象
  /*
  绘图方式
  POINTS 可视的点
  LINES 单独线段
  LINE_STRIP 线条
  LINE_LOOP 闭合线条
  TRIANGLES 单独三角形
  TRIANGLE_STRIP 三角带
  TRIANGLE_FAN 三角扇
   */
  type: 'POINTS',
  source: [], // 顶点数据
  sourceSize: 0,  // 绘制图形的顶点数(顶点总数)
  elementBytes: 4, // 单位数组字节偏移量。
  categorySize: 0, // 属性占有的总的字节数(类目尺寸)
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
    // 基于数据源计算类目尺寸、类目字节数、顶点总数
    this.calculateSize()
    // 更新attribute 变量
    this.updateAttribute();
    // 更新uniform变量
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
    // 类目尺寸
    this.categorySize = categorySize
    // 类目字节数
    this.categoryBytes = categorySize * elementBytes
    // 顶点总数
    this.sourceSize = source.length / categorySize
  }

  updateSource(source) {
    this.source = source
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
      // 对纹理图像垂直翻转
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      // 激活纹理单元
      gl.activeTexture(gl[`TEXTURE${ind}`])
      // 创建纹理对象
      const texture = gl.createTexture()
      // 把纹理对象绑定到纹理单元
      gl.bindTexture(gl.TEXTURE_2D, texture)

      // 配置纹理图像
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        format,
        format,
        gl.UNSIGNED_BYTE,
        image
      )

      // 配置 TEXTURE_WRAP_S 纹理参数
      wrapS && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        wrapS
      )

      // 配置 TEXTURE_WRAP_T 纹理参数
      wrapT && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        wrapT
      )

      // 配置 TEXTURE_MAG_FILTER 纹理放大滤波器
      magFilter && gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        magFilter
      )

      if (!minFilter || minFilter > 9729) {
        // 为图像源创建分子贴图，
        gl.generateMipmap(gl.TEXTURE_2D)
      }

      // 配置 TEXTURE_MIN_FILTER 纹理缩小滤波器
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
