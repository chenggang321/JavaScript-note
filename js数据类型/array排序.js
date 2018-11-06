// 冒泡排序
/*
1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。
2.第一轮的时候最后一个元素应该是最大的一个。
3.按照步骤一的方法进行相邻两个元素的比较，
这个时候由于最后一个元素已经是最大的了，
所以最后一个元素不用比较
*/
function bubbleSort(arr){
    var len = arr.length; //  执行 1 次
    for(var i = 0;i<len;i++){ // 执行 n+1 次
        for(var j = 0;j < len-1-i;j++){ // 执行n*(n+1) 次
            if(arr[j]>arr[j+1]){ // 执行 n*n 次
                var temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr; // 执行 1 次
}
// 平均时间复杂度 1 + n+1 +n(n+1) + n*n + 1 => O(n^2)
console.log(bubbleSort([5,3,2,1,4]));

/*快速排序是对冒泡排序的一种改进，
第一趟排序时将数据分成两部分，
一部分比另一部分的所有数据都要小。
然后递归调用，在两边都实行快速排序。*/

//定义一个函数,它的参数是一个数组
function quickSort(arr) {
    //检查数组的元素个数,如果小于等于1,就返回
    if (arr.length <= 1) { return arr; }
    //选择基准,并将其与原数组分离,
    var pivotIndex = Math.floor(arr.length / 2) ;
    var pivot = arr.splice(pivotIndex, 1)[0];
    //再定义两个空数组,用来存放一左一右的两个子集
    var left = [];
    var right = [];
    //开始遍历数组,小于"基准"的元素放入左边的子集,大于基准的元素放入右边的子集
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    //递归调用
    return quickSort(left).concat([pivot], quickSort(right));
}
console.log(quickSort([5,3,2,1,4]))

//选择排序
//依次选出最小的数，第二小的数...放在最前面
function selectionSort(arr){
    var len = arr.length;
    for(var i = 0;i<len;i++){
        var minIndex = i;
        for(var j = i+1;j<len;j++){
            if(arr[minIndex]>arr[j]){
                minIndex = j
            }
        }
        // 将i位和mIndex(j)位进行交换
        var temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
// 平均时间复杂度 O(n^2)
console.log(selectionSort([5,3,2,1,4]));

// 插入排序
function insertionSort(arr){
    var len = arr.length;
    for(var i=1; i<len; i++) {
        for(var j=i; j<len && arr[j-1]>arr[j]; j--) {
            var temp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = temp;
        }
    }
    return arr;
}
console.log(insertionSort([5,3,2,1,4]));