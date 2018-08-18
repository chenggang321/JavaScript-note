/*
*Generator函数是es6提供的一种异步编程解决方案，通过yield标识位和
* next() 方法调用实现函数的分段执行
* 可以随心所欲的交出和恢复函数的执行权，yield交出执行权，next()恢复执行权。
* */

// 声明生成器函数
function* generator(text){
    console.log('对参数:'+text+'做一些处理')
    let gStep01 = yield '生成器第一步'
    console.log('对传入的第一步结果:'+gStep01+'做处理')
    let gStep02 = yield '生成器第二步'
    console.log('对传入的第二步结果：'+gStep02+'做处理')
}

// 使用生成器函数
let g = generator('你好！');
// 启动生成器，返回生成器第一步传出的结果
let step01 = g.next();
console.log(step01);//{value: "生成器第一步", done: false}
let step02 = g.next('外部第一步传入的参数');
console.log(step02);//{value: "生成器第二步", done: false}
let end =g.next('外部第二步传入的参数');
console.log(end);//{value: undefined, done: true}

// 普通函数
function getData(){
    getData01();
    getData02();
}
//getData()


// 对生成器函数的应用
// 通过生成器处理异步请求的依赖关系
function* task(){
    let gstep01 = yield getData01
    let gstep02 = yield getData02
}

//流程控制
function run(fn){
    const gen = fn();
    function next() {
        const result = gen.next();
        if (result.done) return;//结束
        // result.value就是yield返回的值，是各个工序的函数
        result.value(next);//next作为入参，即本工序成功后，执行下一工序
    }
    next();
}

run(task);


// 模拟异步进程
function getData01(fn) {
    setTimeout(function(){
        console.log('第一次获得的异步数据');
        let data = {data:'this is data1',status:true}
        fn&&fn(data);
        return data
    },2000)
}

function getData02(fn){
    setTimeout(function(){
        console.log('第二次异步获取的数据')
        let data = {data:'this is data2',status:true}
        fn&&fn(data)
        return data
    },1000)
}

/*
* Promise 解决异步回调问题
* */

// 用Promise封装异步进程
function ajax01(){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log('第一次获得的异步数据');
            let data = {data:'this is data1',status:true}
            resolve(data)
        },2000)
    })
}

function ajax02(data){
    if(data.status){
        return new Promise(function(resolve){
            setTimeout(function(){
                console.log('第二次异步获取的数据')
                let data = {data:'this is data2',status:true}
                resolve(data)
            },1000)
        })
    }
}

ajax01()
    .then(function(data){
        return ajax02(data)
    })
    .then(function(data){
        console.log(data)
    })



