// 1.使用let和const代替var

// bad
// var a=1,b=2,c=3

// best
// const [a, b, c] = [1, 2, 3];

// 2.字符串
// bad
// const a = "footer";
// const b = 'foo' + a + 'bar';

// good
// const a = 'footer';
// const b = 'foo${a}bar';

// 3 结构赋值
// const arr = [1,2,3,4];
// bad
// const first = arr[0];
// const second = arr[1];

// good
// const [first,second] = arr;

// bad
// function getFullName(user){
//     const firstName = user.firstName;
//     const lastName = user.lastName;
// }

// good
// function getFullName(obj){
//     const {firstName,lastName} = obj;
// }

// best
// function getFullName({firstName,lastName}){
//
// }


// bad
// function processInput(input){
//     return [left,right,top,bottom]
// }

// good
// function processInput(input){
//     return {left,right,top,bottom}
// }
// const {left,right} = processInput(input)

// 4.对象
// bad
// const a = {k1:v1,k2:v2,};
// const b = {
//     k1:v1,
//     k2:v2
// };

// good
// const a = {k1:v1,k2:v2};
// const b = {
//     k1:v1,
//     k2:v2,
// }

// var ref = 'some value'
// bad
// const atom = {
//     ref:ref,
//     value:1,
//     addValue:function(value){
//         return atom.value + value;
//     },
// }

// good
// const atom = {
//     ref,
//     value:1,
//     addValue(){
//         return atom.value + value
//     }
// }

// 5.数组
// bad
// const len = items.length;
// const itemsCopy = [];
// let i;
// for(i=0;i<len;i++){
//     itemsCopy = items[i]
// }

// good
// const itemsCopy = [...items]





