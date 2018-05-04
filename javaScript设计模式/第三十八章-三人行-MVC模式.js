/**
 * Created by HH_Girl on 2018/2/24.
 */
/*
* MVC模式即模型（model）-视图（view）-控制器（controller）,用一种将
* 业务逻辑、数据、视图分离的方式组织架构代码
*
* 缺点：每次修改数据时，要手动 render 页面
* */

//一个简单的mvc
//模拟 Model,View,Controller
var M = {},V = {}, C = {};

// Model 存储数据
M.data = 'hello world';

// View 负责将数据显示到页面上
V.render = function(m){
    document.body.innerHTML = m.data;
};

// Controller 连接 M 和 V
C.handleOnload = function(){
    V.render(M);
};

// 使用时直接调用 Controller
C.handleOnload();
