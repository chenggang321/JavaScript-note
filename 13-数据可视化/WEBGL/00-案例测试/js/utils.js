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

function createProgram(gl, vsSource, fsSource) {
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
  return program
}

/**
 * dom坐标转webgl坐标
 * @param e 点击事件
 * @param canvas canvas
 * @returns {number[]} 坐标位置
 */
function webGlClick(e,canvas){
  // 鼠标在屏幕中的位置
  const {clientX, clientY} = e;
  // canvas左上角在屏幕中的位置
  const {left, top, width, height} = canvas.getBoundingClientRect();
  // 鼠标在canvas 2d坐标系中的位置
  const [cssX, cssY] = [
    clientX - left,
    clientY - top
  ];

  // 将原点移至canvas中心
  const [halfWidth, halfHeight] = [width / 2, height / 2];
  let [xBaseCenter, yBaseCenter] = [cssX - halfWidth, cssY - halfHeight];

  // 将y轴方向改为向上
  yBaseCenter = -yBaseCenter;

  // 解决坐标基底的差异
  return [xBaseCenter / halfWidth, yBaseCenter / halfHeight]
}

export {
  webGlClick,
  initShaders,
  createProgram
}
