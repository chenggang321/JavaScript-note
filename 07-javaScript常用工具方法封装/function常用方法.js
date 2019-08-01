/**
 *  捕获函数报错
 * @param fn
 * @param args
 * @returns {*}
 */
const attempt = (fn,...args) => {
    try {
        return fn(...args)
    }catch (e) {
        return e instanceof Error ? e : new Error(e)
    }
}

const bind = (fn,context,...boundArgs) => (...args) => fn.apply(context,[...args,...boundArgs]);
