/*
*  断言测试函数
* */
// 创建dom
var container = document.createElement('ul')
container.id = 'results'
document.body.appendChild(container)
;(function(){
    var queue = [],paused = false,results;
    results = document.getElementById('results')
    this.test = function(name,fn){
        queue.push(function(){
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

// 调用实例
/*
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
}*/
