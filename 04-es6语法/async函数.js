/*
* 基本用法
* async函数放回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await
* 就先返回，等到异步操作完成，再接着执行函数体内后面的语句。
* */

function timeout(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function asyncPrint(value,ms){
    try {
        await timeout(ms);
    }catch (e) {
        console.log(e)
    }
    console.log(value);
}

asyncPrint('hello world!',1000);
