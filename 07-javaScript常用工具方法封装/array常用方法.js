/**
 *  数组内数据是否都满足条件
 * @param arr
 * @param fn
 * @returns {boolean}
 */
const all = (arr, fn = Boolean) => arr.every(fn);
// all([4, 2, 3], x => x > 1); // true
// all([1, 2, 3]); // true

/**
 *  数组内所有元素是否一样
 * @param arr
 * @returns {boolean}
 */
const allEqual = arr => arr.every(val => val === arr[0]);
// allEqual([1, 2, 3, 4, 5, 6]); // false
// allEqual([1, 1, 1, 1]); // true

/**
 * 数组内数据是否有满足条件数据
 * @param arr
 * @param fn
 * @returns {boolean}
 */
const any = (arr, fn = Boolean) => arr.some(fn);
// any([0, 1, 2, 0], x => x >= 2); // true
// any([0, 0, 1, 0]); // true

/**
 * 根据filter数组分组
 * @param arr
 * @param filter
 * @returns {*}
 */
const bifurcate = (arr, filter) => arr.reduce((total, currentValue, currentIndex) => (total[filter[currentIndex] ? 0 : 1].push(currentValue), total), [[], []]);
// bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]); // [ ['beep', 'boop', 'bar'], ['foo'] ]

/**
 * 根据传入函数分组
 * @param arr
 * @param fn
 * @returns {*}
 */
const bifurcateBy = (arr, fn) => arr.reduce((total, currentValue, currentIndex) => (total[fn(currentValue, currentIndex) ? 0 : 1].push(currentValue), total), [[], []]);
// bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]

/**
 * 将数组分为大小为size的数组
 * @param arr
 * @param size
 * @returns {(T[] | SharedArrayBuffer | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | Float32Array | string | Uint16Array | ArrayBuffer | Int32Array | BigInt64Array | Uint8Array | Int8Array)[]}
 */
const chunk = (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size));
// chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]

/**
 * 去除数组中的false元素
 * @param arr
 * @returns {*}
 */
const compact = arr => arr.filter(Boolean);
// compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]

/**
 *  统计满足条件数据个数
 * @param arr
 * @param fn
 * @returns {number | {} | BigInt | T}
 */
const countBy = (arr, fn) => arr.map(typeof fn === 'function' ? fn : val => (val[fn]))
    .reduce((total, currentValue) => (total[currentValue] = (total[currentValue] || 0) + 1, total), {});
// countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
// countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}

/**
 *  统计数组中某个值的数量
 * @param arr
 * @param val
 * @returns {*}
 */
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
// countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

/**
 * 深度扁平化数组
 * @param arr
 * @returns {*[]}
 */
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
// deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

/**
 *  找出a中b不包含的元素
 * @param a
 * @param b
 * @returns {*}
 */
const difference = (a, b) => {
    const s = new Set(b);
    return a.filter(x => !s.has(x));
}
// difference([1, 2, 3], [1, 2, 4]); // [3]

/**
 * 先map再找出不同的元素
 * @param a
 * @param b
 * @param fn
 * @returns {Uint8Array}
 */
const differenceBy = (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.map(fn).filter(el => !s.has(el));
}
// differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1]
// differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [2]

/**
 *  先用一个函数处理数据再找出不同
 * @param arr
 * @param val
 * @param comp
 * @returns {*}
 */
const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b) === -1));
// differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2]

/**
 * 从左边裁剪数组
 * @param arr
 * @param n
 * @returns {T[] | SharedArrayBuffer | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | Float32Array | string | Uint16Array | ArrayBuffer | Int32Array | BigInt64Array | Uint8Array | Int8Array}
 */
const drop = (arr, n = 1) => arr.slice(n);
// drop([1, 2, 3]); // [2,3]
// drop([1, 2, 3], 2); // [3]
// drop([1, 2, 3], 42); // []

/**
 * 从右边裁剪数组
 * @param arr
 * @param n
 * @returns {T[] | SharedArrayBuffer | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | Float32Array | string | Uint16Array | ArrayBuffer | Int32Array | BigInt64Array | Uint8Array | Int8Array}
 */
const dropRight = (arr, n = 1) => arr.slice(0, -n);
// drop([1, 2, 3]); // [2,3]
// drop([1, 2, 3], 2); // [3]
// drop([1, 2, 3], 42); // []

/**
 * 截取满足fn条件的数组
 * @param arr
 * @param fn
 * @returns {T[] | SharedArrayBuffer | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | Float32Array | string | Uint16Array | ArrayBuffer | Int32Array | BigInt64Array | Uint8Array | Int8Array}
 */
const dropRightWhile = (arr, fn) => {
    let rightIndex = arr.length;
    while (rightIndex-- && !fn(arr[rightIndex])) {
        return arr.slice(0, rightIndex + 1);
    }
};
// dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

/**
 *  截取满足fn条件的数组
 * @param arr
 * @param fn
 * @returns {*}
 */
const dropWhile = (arr, fn) => {
    while (arr.length > 0 && !fn(arr[0])) arr = arr.slice(1);
    return arr;
}
// dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]

/**
 * 隔几位获取元素
 * @param arr
 * @param nth
 * @returns {*}
 */
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
// everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]

/**
 *  过滤数组中相同的元素
 * @param arr
 * @returns {*}
 */
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

/**
 *  根据函数过滤数组中的元素
 * @param arr
 * @param fn
 * @returns {*}
 */
const filterNonUniqueBy = (arr, fn) => arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
// filterNonUniqueBy(
//     [
//         { id: 0, value: 'a' },
//         { id: 1, value: 'b' },
//         { id: 2, value: 'c' },
//         { id: 1, value: 'd' },
//         { id: 0, value: 'e' }
//     ],
//     (a, b) => a.id == b.id
// ); // [ { id: 2, value: 'c' } ]

/**
 *  根据函数筛选数组返回最后一个元素
 * @param arr
 * @param fn
 * @returns {*|T}
 */
const findLast = (arr, fn) => arr.filter(fn).pop();
// findLast([1, 2, 3, 4], n => n % 2 === 1); // 3

/**
 *  根据函数过滤数组并返回最后一个元素的位置
 * @param arr
 * @param fn
 * @returns {*}
 */
const findLastIndex = (arr, fn) => arr.map((val, i) => [i, val]).filter(([i, val]) => fn(val, i, arr)).pop()[0];
// findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)

/**
 * 数组扁平化
 * @param arr
 * @param depth
 * @returns {*}
 */
const flatten = (arr, depth = 1) => arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
// flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
// flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]

/**
 * 从右边遍历数组
 * @param arr
 * @param fn
 */
const forEachRight = (arr, fn) => arr.slice(0).reverse().forEach(fn);
// forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

/**
 * 返回头部元素
 * @param arr
 * @returns {*}
 */
const head = arr => arr[0];
// head([1, 2, 3]); // 1

/**
 *  返回所有val的位置
 * @param arr
 * @param val
 * @returns {*}
 */
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
// indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
// indexOfAll([1, 2, 3], 4); // []

/**
 *  返回数组除最后一个元素
 * @param arr
 * @returns {T[] | SharedArrayBuffer | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | Float32Array | string | Uint16Array | ArrayBuffer | Int32Array | BigInt64Array | Uint8Array | Int8Array}
 */
const initial = arr => arr.slice(0, -1);
// initial([1, 2, 3]); // [1,2]
/**
 *  初始化一个二维数组
 * @param w
 * @param h
 * @param val
 * @returns {any[][]}
 */
const initialize2DArray = (w, h, val = null) => Array.from({length: h}, () => Array.from({length: w}).fill(val));
// initialize2DArray(4, 4, 0); // [[0,0], [0,0]]

/**
 *  按step初始化一个一维数组
 * @param end
 * @param start
 * @param step
 * @returns {number[]}
 */
const initializeArrayWithRange = (end, start = 0, step = 1) => Array.from({length: Math.ceil((end - start + 1) / step)}, (v, i) => i * step + start);
// initializeArrayWithRange(5); // [0,1,2,3,4,5]
// initializeArrayWithRange(7, 3); // [3,4,5,6,7]
// initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]
/**
 * 按step初始化一个一维数组
 * @param end
 * @param start
 * @param step
 * @returns {any[]}
 */
const initializeArrayWithRangeRight = (end, start = 0, step = 1) => Array.from({length: Math.ceil((end + 1 - start) / step)}, (v, i, arr) => (arr.length - i - 1) * step + start);
// initializeArrayWithRangeRight(5); // [5,4,3,2,1,0]
// initializeArrayWithRangeRight(7, 3); // [7,6,5,4,3]
// initializeArrayWithRangeRight(9, 0, 2); // [8,6,4,2,0]

/**
 * 按value初始化一个一维数组
 * @param n
 * @param val
 * @returns {any[]}
 */
const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);
// initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

/**
 * 初始化一个n维的数组
 * @param val
 * @param args
 * @returns {*[]}
 */
const initializeNDArray = (val, ...args) => args.length === 0
    ? val
    : Array.from(
        {length: args[0]},
        () => initializeNDArray(val, ...args.slice(1))
    );
// initializeNDArray(1, 3); // [1,1,1]
// initializeNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]

const join = (arr, separator = ',', end = separator) => arr.reduce(
    (acc, val, i) => i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
            ? acc + val
            : acc + val + separator,
    ''
)
// join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); // "pen,pineapple,apple&pen"
// join(['pen', 'pineapple', 'apple', 'pen'], ','); // "pen,pineapple,apple,pen"
// join(['pen', 'pineapple', 'apple', 'pen']); // "pen,pineapple,apple,pen"

/**
 *  获取最后一个元素
 * @param arr
 * @returns {*}
 */
const last = arr => arr[arr.length - 1]
// last([1, 2, 3]); // 3

/**
 *  将数组映射为对象
 * @param arr
 * @param fn
 * @returns {*}
 */
const mapObject = (arr, fn) => (
    a => (
        (a = [arr, arr.map(fn)]), a[0].reduce((acc, val, ind) => (
            (acc[val] = a[1][ind]), acc
        ), {})
    )
)();
// const squareIt = arr => mapObject(arr, a => a * a);
// squareIt([1, 2, 3]); // { 1: 1, 2: 4, 3: 9 }

/**
 *  获取最大值
 * @param arr
 * @param n
 * @returns {any[]}
 */
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);
// maxN([1, 2, 3]); // [3]
// maxN([1, 2, 3], 2); // [3,2]

/**
 *  获取最小值
 * @param arr
 * @param n
 * @returns {any[]}
 */
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
// minN([1, 2, 3]); // [1]
// minN([1, 2, 3], 2); // [1,2]

/**
 *  获取对应位置的元素
 * @param arr
 * @param n
 * @returns {T | * | BigInt | number | string}
 */
const nthElement = (arr, n = 0) => (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];
// nthElement(['a', 'b', 'c'], 1); // 'b'
// nthElement(['a', 'b', 'b'], -3); // 'a'

/**
 *  从某个位置对调头尾
 * @param arr
 * @param offset
 * @returns {...T[] | SharedArrayBuffer | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | Float32Array | string | Uint16Array | ArrayBuffer | Int32Array | BigInt64Array | Uint8Array | Int8Array[]}
 */
const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];
// offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
// offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]

/**
 *  枚举数组所有情况
 * @param arr
 * @returns {*}
 */
const permutations = arr => {
    if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
    return arr.reduce(
        (acc, item, i) => acc.concat(
            permutations([...arr.slice(0, i), ...arr.slice(i + 1)])
                .map(val => [item, ...val])
        )
        , [])
}
// permutations([1, 33, 5]); // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]

/**
 * 根据fn过滤数据，根据keys过滤属性
 * @param data
 * @param keys
 * @param fn
 * @returns {Uint8Array | BigInt64Array | *[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
 */
const reducedFilter = (data, keys, fn) => data.filter(fn)
    .map(el => keys.reduce((acc, key) => (acc[key] = el[key], acc), {}));
// reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]

/**
 *  修改特定元素位置
 * @param arr
 * @param fn
 * @param sortIndex
 * @returns {T[] | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | SharedArrayBuffer | string | Uint16Array | ArrayBuffer | Int32Array | Float32Array | BigInt64Array | Uint8Array | Int8Array}
 */
const replaceBySortIndex = (arr,fn, sortIndex) =>  {
    const filterObj = arr.map((item,index) => ({...item,item,index})).filter(fn).pop();
    arr = arr.slice(0);
    arr.splice(filterObj.index,1);
    arr.splice(sortIndex,0,filterObj.item);
    return arr;
}

const data = [{key:1,value:'aaa'},{key:2,value:'ccc'},{key:3,value:'ddd'},{key:13,value:'eee'}];
console.log(replaceBySortIndex(data, item => item.key === 2, 0));