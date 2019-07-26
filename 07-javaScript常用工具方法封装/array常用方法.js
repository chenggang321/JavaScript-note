/**
 *  数组内数据是否都满足条件
 * @param arr
 * @param fn
 * @returns {boolean}
 */
const all = (arr, fn = Boolean) => arr.every(fn);

/**
 *  数组内所有元素是否一样
 * @param arr
 * @returns {boolean}
 */
const allEqual = arr => arr.every(val => val === arr[0]);

/**
 * 数组内数据是否有满足条件数据
 * @param arr
 * @param fn
 * @returns {boolean}
 */
const any = (arr, fn = Boolean) => arr.some(fn);

/**
 * 根据filter数组分组
 * @param arr
 * @param filter
 * @returns {*}
 */
const bifurcate = (arr, filter) => arr.reduce((total, currentValue, currentIndex) => (total[filter[currentIndex] ? 0 : 1].push(currentValue), total), [[], []]);

/**
 * 根据传入函数分组
 * @param arr
 * @param fn
 * @returns {*}
 */
const bifurcateBy = (arr, fn) => arr.reduce((total, currentValue, currentIndex) => (total[fn(currentValue, currentIndex) ? 0 : 1].push(currentValue), total), [[], []]);

/**
 * 将数组分为大小为size的数组
 * @param arr
 * @param size
 * @returns {(T[] | SharedArrayBuffer | BigUint64Array | Uint8ClampedArray | Uint32Array | Blob | Int16Array | Float64Array | Float32Array | string | Uint16Array | ArrayBuffer | Int32Array | BigInt64Array | Uint8Array | Int8Array)[]}
 */
const chunk = (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size));

/**
 * 去除数组中的false元素
 * @param arr
 * @returns {*}
 */
const compact = arr => arr.filter(Boolean);

const countBy = (arr,fn) => arr.map(typeof fn === 'function' ? fn : val =>(val[fn]) )
                                .reduce((total,currentValue) => (total[currentValue] = (total[currentValue] || 0) + 1,total),{});

