/**
 * Created by HH_Girl on 2018/4/4.
 */
function hashFunc(str,max){
    var hashCode = 0;
    [].forEach.call(str,function(item,index){
        hashCode = 37*hashCode + str.charCodeAt(index);
    });
    return hashCode % max;
}
console.log(hashFunc('abc',7));