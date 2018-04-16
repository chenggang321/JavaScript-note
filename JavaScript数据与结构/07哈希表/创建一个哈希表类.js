/**
 * Created by HH_Girl on 2018/4/10.
 */
//hashTable类
function HashTable() {
    //定义属性
    this.storage = [];
    this.count = 0;
    this.limit = 8;
}
HashTable.prototype = {
    //是否为质数
    isPrime: function (num) {
        var temp = parseInt(Math.sqrt(num));
        //循环判断
        for (var i = 2; i <= temp; i++) {
            if (num % i === 0) {
                return false;
            }
            return true;
        }
    },
    //获取质数
    getPrime:function(num){
        while(!this.isPrime(num)){
            num++
        }
        return num;
    },
    //哈希函数
    hashFunc:function(str,max){
        var hashCode = 0;
        for(var i = 0;i<str.length;i++){
            hashCode = 37*hashCode + str.charCodeAt(i);
        }
        hashCode = hashCode % max;
        return hashCode;
    },
    //插入数据方法
    put:function(key,value){
        //获取key对应的index
        var index = this.hashFunc(key,this.limit);
        //取出数组
        var bucket = this.storage[index];
        //判断这个数组是否存在
        if(bucket === (void 0)){
            //创建桶
            bucket = [];
            this.storage[index] = bucket;
        }
        //判断是新增还是修改原来是值
        var override = false;
        for(var i=0;i<bucket.length;i++){
            var tuple = bucket[i];
            if(tuple[0] === key){
                tuple[1] = value;
                override = true;
            }
        }
        //如果是新增，前一步没有覆盖
        if(!override){
            bucket.push([key,value]);
            this.count++;
            if(this.count > this.limit * 0.75){
                var primeNum = this.getPrime(this.limit*2);
                this.resize(primeNum);
            }
        }
    },
    //获取存放的数据
    get:function(key){
        //获取key对应的index
        var index = this.hashFunc(key,this.limit);
        //获取对应的bucket
        var bucket = this.storage[index];
        //如果bucket为null,那么说明这个位置没有数据
        if(bucket === null){
            return null;
        }
        //有bucket，判断是否有对应的key
        for(var i=0;i<bucket.length;i++){
            var tuple = bucket[i];
            if(tuple[0] === key){
                return tuple[1];
            }
        }
        //没有找到
        return null
    },
    //删除数据
    remove:function(key){
        //获取对应的index
        var index = this.hashFunc(key,this.limit);
        //获取对应的bucket
        var bucket = this.storage[index];
        //判断是否为null,为null则说明没有对应数据
        if(bucket === null){
            return null;
        }
        //遍历bucket，寻找对应的数据
        for(var i=0;i<bucket.length;i++){
            var tuple = bucket[i];
            if(tuple[0] === key){
                bucket.splice(i,1);
                this.count--;

                //缩小数组的容量
                if(this.limit > 7 && this.count < this.limit * 0.25){
                    var primeNum = this.getPrime(Math.floor(this.limit / 2));
                    this.resize(primeNum);
                }
            }
            return tuple[1]
        }
        return null;
    },
    size:function(){
        return this.count;
    },
    //哈希表扩容
    resize:function(newLimit){
        //保存旧的数组内容
        var oldStorage = this.storage;
        //重置属性
        this.limit = newLimit;
        this.count = 0;
        this.storage = [];
        //遍历旧数组中的所有数据，并重新插入到哈希表中
        oldStorage.forEach(function(bucket){
            if(bucket === null){
                return;
            }
            //bucket中有数据，那么将里面的数据重新哈希化插入
            for(var i=0;i<bucket.length;i++){
                var tuple = bucket[i];
                this.put(tuple[0],tuple[1]);
            }
        }).bind(this);
    }
};