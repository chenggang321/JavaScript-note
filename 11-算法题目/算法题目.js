// 1.  给出一个正整数数组，按照其元素出现频次的降序对数组进行排列。
const arr = [1,2,3,4,5,3,2,1,1,3];
function arrSort(arr){
    return [...new Set(arr)].map(item => ({length:arr.filter(i => item === i).length, number:item}))
        .sort((a,b) => b.length -a.length)
        .map(item => Array.from({length:item.length}).fill(item.number))
        .reduce((total,currentValue) => [...total,...currentValue])
}
console.log(arrSort(arr));
// 2.  给定一棵树且在一些节点有K个苹果。求在不穿过一条边一次以上的情况下能收集倒的最大苹果数目。
// 3.  对于给定的数，输出该数中各数字的最小数列且决不从零开始。
// 输入:706 输出:607
function mini(number){
    const arr = [...number.toString()].sort((a,b) => a - b);
    let map = arr.map((item,i) => ({item,i})).filter(({item}) => item > 0 ).sort((a,b) => a.i - b.i)[0];
    arr.splice(map.i,1);
    return Number([map.item,...arr].join(''))
}
console.log(mini(13123190));
// 4. 有一个二维迷宫矩阵，请判断从矩阵左上角到数字9之间，是否存在一个由若干个1组成的路径。
// 5.判断给定字符串是否包含平衡括号序列。
// 6.给定一个有N*M块的水果蛋糕，每块由一种唯一的水果组成。有K个人，每个人都可以自己选择水果。找出那些能够因得到自己选择的蛋糕而开心的人的最大数目。（每人最多只能得到一块蛋糕）。
// 7.将增量矩阵乘以其转置矩阵。
// 8. 给出从家到学校的距离，果汁摊位的数目和它们与家的距离，以及这些摊位可提供作为能量的果汁。求在到达学校过程中的最少停歇次数。