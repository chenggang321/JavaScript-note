class Middleware {
    constructor({core,params}) {
        this.core = core
        this.params = params
        this.cache = []
    }
    use(fn) {
        if(typeof fn !== 'function'){
            throw 'middleware must be a function'
        }
        this.cache.push(fn)
        return this
    }
    next(data) {
        if(this.cache && this.cache.length > 0){
            const fn = this.cache.shift()
            fn.call(this,this.next.bind(this),data)
        }
        return this
    }

    async go(){
        const result = await this.core(this.params)
        this.next(result)
    }
}

function test(data){
    console.log('success')
    return data
}

function fn1(next,data){
    console.log('fn1'+data)
    next('data1')
}
function fn2(next,data){
    console.log('fn2'+data)
    next('data2')
}
function fn3(next,data){
    console.log('fn3'+data)
    next('data3')
}

const m = new Middleware({core:test,params:'data'})
m.use(fn1).use(fn2).use(fn3).go()
