/**
 * @param gl webgl上下文对象
 * @param vsSource 顶点着色器源文件
 * @param fsSource 片元着色器源文件
 * @returns {boolean}
 */
function initShaders(gl, vsSource, fsSource) {
  //创建程序对象
  const program = gl.createProgram();
  //建立着色对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  //把顶点着色对象装进程序对象中
  gl.attachShader(program, vertexShader);
  //把片元着色对象装进程序对象中
  gl.attachShader(program, fragmentShader);
  //连接webgl上下文对象和程序对象
  gl.linkProgram(program);
  //启动程序对象
  gl.useProgram(program);
  //将程序对象挂到上下文对象上
  gl.program = program;
  return true;
}

/**
 * 建立着色对象方法
 * @param gl webgl上下文对象
 * @param type 着色器类型 gl.VERTEX_SHADER 是顶点着色器类型 gl.FRAGMENT_SHADER是片元着色器类型。
 * @param source 着色器源文件
 * @returns {WebGLShader}
 */
function loadShader(gl, type, source) {
  //根据着色类型，建立着色器对象
  const shader = gl.createShader(type);
  //将着色器源文件传入着色器对象中
  gl.shaderSource(shader, source);
  //编译着色器对象
  gl.compileShader(shader);
  //返回着色器对象
  return shader;
}

export {
  initShaders
}
