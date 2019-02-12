/*
*  匿名函数为什么如此重要
*  函数调用的引用形式，包括递归
*  函数引用的存储
*  函数上下文的利用
*  处理可变长度的参数列表
*  判断一个对象是否是函数
* */

// 递归

function chirp(n) {
    return n > 1 ? chirp(n - 1) + '-chirp' : 'chirp'
}

assert(chirp(3) === 'chirp-chirp-chirp',
    'Calling the named function comes naturally')

// 引用丢失 callee
// 将函数视为对象
// 函数存储

var store = {
    nextId: 1,
    cache: {},
    add: function (fn) {
        if (!fn.id) {
            fn.id = store.nextId++
            return !!(store.cache[fn.id] = fn)
        }
    }
}

function ninja() {
}

assert(store.add(ninja),
    'Function was safely added.')
assert(!store.add(ninja),
    'But it was only added once')

// 自记忆函数
/*
*  缓存记忆是构造函数的过程，这种函数能够记住先前计算的结果。通过避免已经执行过的不必要
*  复杂计算复杂计算，这种方式可以显著提高性能。
* */
function isPrime(value) {
    if (!isPrime.answers) isPrime.answers = {}
    if (isPrime.answers[value]) {
        return isPrime.answers[value]
    }
    var prime = (value !== 1); // 1 can never be prime
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            prime = false
            break
        }
    }
    return isPrime.answers[value] = prime
}
assert(isPrime(5), '5 is prime!')
assert(isPrime.answers[5], 'The answer was cached')

// 缓存记忆DOM元素
// 伪造数组方法
var elems = {
    length:0,
    add:function(elem){
        Array.prototype.push.call(this,elem)
    },
    gather:function(id){
        this.add(document.getElementById(id))
    }
}
elems.gather('results')
assert(elems.length === 1 && elems[0].nodeType,
    'Verify that we have an element in our stash')

// 可变长度的参数列表
// 使用apply()支持可变参数
function smallest(array){
    return Math.min.apply(Math,array)
}
function largest(array){
    return Math.max.apply(Math,array)
}

assert(smallest([0,1,2,3]) === 0,
    'Located the smallest value.')
assert(largest([0,1,2,3]) === 3,
    'Located the largest value')

// 函数重载
function merge(root){
    for(var i=1; i<arguments.length;i++){
        for(var key in arguments[i]){
            root[key] = arguments[i][key]
        }
    }
    return root
}
var merged = merge({name:'Batou'},{city:'Nihama'})
assert(merged.name === 'Batou',
    'The original name is intact')
assert(merged.city === 'Nihama',
    'And the city has been copied over')

// 对argument列表进行切片(slice)和取舍（dice）
function multiMax(multi){
    return multi * Math.max.apply(Math,Array.prototype.slice.call(arguments,1))
}
assert(multiMax(3,1,2,3) === 9,
    '3*3=9(First arg,by largest.)')

// 函数重载方式
// 函数的length
function makeNija(name){}
function makeSamural(name,rank){}
assert(makeNija.length === 1,
    'Only expecting a single argument')
assert(makeSamural.length === 2,
    'Two arguments expected')
// 利用参数的个数进行函数重载
function addMethod(object,name,fn){
    var old = object[name]
    object[name] = function(){
        if(fn.length === arguments.length)
            return fn.apply(this,arguments)
        else if(typeof old === 'function')
            return old.apply(this,arguments)
    }
}

var ninjas = {
    values:['Dean Edwards','Sam Stephenson','Alex Russell']
}
addMethod(ninjas,'find',function(){
    return this.values
})
addMethod(ninjas,'find',function(name){
    var ret = []
    console.log(this.values)
    for(var i=0;i<this.values.length;i++){
        if(this.values[i].indexOf(name) === 0){
            ret.push(this.values[i])
            return ret
        }
    }
})
addMethod(ninjas,'find',function(first,last){
    var ret = []
    for(var i=0;i<this.values.length;i++){
        if(this.values[i] === (first + ' '+last)){
            ret.push(this.values[i])
            return ret
        }
    }
})
console.log(ninjas.find().length)
assert(ninjas.find().length === 3,
    'Found all ninjas')
console.log(ninjas.find('Sam'))
assert(ninjas.find('Sam').length === 1,
    'Found ninja by first name')
assert(ninjas.find('Alex','Russel','Jr') === undefined,
    'Found nothing')

// 函数判断
function isFunction(fn){
    return Object.prototype.toString.call(fn) === '[object Function]'
}