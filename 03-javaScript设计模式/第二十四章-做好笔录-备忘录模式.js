/**
 * Created by HH_Girl on 2018/2/8.
 */
/*
* 备忘录模式：在不破坏对象封装的前提下，在对象之外捕获
* 并保存该对象内部状态以便日后对象使用或者恢复到以前的
* 某个状态
* */
//page 备忘录类
/*var Page = function () {
    //信息缓存对象
    var cache = {};
    /!*
    * 主函数
    * 参数 page 页码
    * 参数 fn 成功回调函数
    * *!/
    return function (page, fn) {
        //判断该页面数据是否在缓存中
        if (cache[page]) {
            //恢复到该页面，显示该页面内容
            showPage(page, cache[page]);
            //执行成功回调函数
            fn && fn();
        } else {
            //若缓存Cache中无该页数据
            $.post('data.json', {
                //请携带数据page页码
                page: page
            }, function () {
                //成功返回
                if (res.errNo === 0) {
                    //显示该页数据
                    showPage(page, res.data);
                    //执行成功回调函数
                    fn && fn();
                } else {
                    //处理异常
                }
            })
        }
    }
}();*/


/**
 *  LRU缓存机制  Least Recently Used ：最近最少使用
 *  缓存淘汰策略，故名思义，就是根据数据的历史访问记录来进行淘汰数据，其核心思想是
 *  如果数据最近被访问过，那么将来被访问的几率也更高 ，优先淘汰最近没有被访问到的数据。
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        const {cache} = this;
        if (cache.has(key)) {
            const temp = cache.get(key);
            cache.delete(key);
            cache.set(key, temp);
            return temp;
        }
        return -1;
    }

    add(key, value) {
        const {cache} = this;
        if (cache.has(key)) {
            cache.delete(key);
        } else if (cache.size >= this.capacity) {
            cache.delete(cache.keys().next().value);
        }
        cache.set(key, value);
    }
}

let cache = new LRUCache(2);
cache.add(1, 1);
cache.add(2, 2);
cache.get(1);       // 返回  1
cache.add(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.add(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4



