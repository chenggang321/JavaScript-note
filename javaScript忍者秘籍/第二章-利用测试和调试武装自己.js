// javaScript 代码调试工具
// 测试用例生成技术
// 构建测试套集
// 如何测试异步操作
// 测试套件基础知识
// 断言（assert）
/*
*  该方法通常接收一个值-需要断言的值，以及一个表示该断言的描述。如果该值执行结果为true
*  换句话来说是真值，断言就通过，否则，断言就被认为是失败的
* */
var container = document.createElement('ul')
container.id = 'results'
document.body.appendChild(container)
// 简单实现
/*function assert(value,desc){
    var li = document.createElement('li')
    li.className = value ? 'pass' : 'fail'
    li.appendChild(document.createTextNode(desc))
    document.getElementById('result').appendChild(li)
}

window.onload = function(){
    assert(true,'the test suite is running.')
    assert(false,'fail')
}*/
// 测试分组的实现
/*;(function(){
    var results;
    this.assert = function assert(value,desc){
        var li = document.createElement('li')
        li.className = value ? 'pass' : 'fail'
        li.appendChild(document.createTextNode(desc))
        results.appendChild(li)
        if(!value){
            li.parentNode.parentNode.className = 'fail'
        }
        return li
    }
    this.test = function test(name,fn){
        results = document.getElementById('results')
        results = assert(true,name).appendChild(document.createElement('ul'))
        fn()
    }
})()

window.onload = function(){
    test('a test',function(){
        assert(true,'First assertion completed')
        assert(true,'Second assertion completed')
        assert(true,'Third assertion completed')
    })
    test('Another test',function(){
        assert(true,'First assertion completed')
        assert(false,'Second assertion completed')
        assert(true,'Third assertion completed')
    })
    test('a third test',function(){
        assert(null,'fail')
        assert(5,'pass')
    })
}*/

// 简单的异步测试
;(function(){
    var queue = [],paused = false,results;
    this.test = function(name,fn){
        queue.push(function(){
            results = document.getElementById('results')
            results = assert(true,name).appendChild(
                document.createElement("ul")
            )
            fn()
        })
        runTest()
    }
    this.pause = function(){
        paused = true
    }
    this.resume = function(){
        paused = false
        setTimeout(runTest,1)
    }
    function runTest(){
        if(!paused && queue.length){
            queue.shift()()
            if(!paused){
                resume()
            }
        }
    }
    this.assert = function assert(value,desc){
        var li = document.createElement('li')
        li.className = value ? 'pass' : 'fail'
        li.appendChild(document.createTextNode(desc))
        results.appendChild(li)
        if(!value){
            li.parentNode.parentNode.className = 'fail'
        }
        return li
    }
})()

window.onload = function() {
    test('a test', function () {
        assert(true, 'First assertion completed')
        assert(true, 'Second assertion completed')
        assert(true, 'Third assertion completed')
    })
    test('Another test', function () {
        assert(true, 'First assertion completed')
        assert(false, 'Second assertion completed')
        assert(true, 'Third assertion completed')
    })
    test('a third test', function () {
        assert(null, 'fail')
        assert(5, 'pass')
    })
}

