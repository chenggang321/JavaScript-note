// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。
// 示例:
//
//     输入: s = 7, nums = [2,3,1,2,4,3]
// 输出: 2
// 解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。

function sum(left,right,arr){
    return arr.slice(left,right).reduce((s,v) => s = s + v,0)
}


function answer(s,nums){
    let left = 0, right = 0;
    let target = [];

    while (right < nums.length && left < nums.length){
        right ++

        while (sum(left,right,nums) >= s) {
            target.push([left,right])
            left ++
        }
    }

    return target.map(([left,right]) => nums.slice(left,right)).sort((a, b) => b.length - a.length).pop()
}

console.log(answer(4,[0,3,1,2,11,3]))
