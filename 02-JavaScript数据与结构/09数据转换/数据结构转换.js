/**
 * 属性转换
 * @type {{itemPropLabel: string, itemPropName: string, itemPropValue: string, set: boolean}}
 *
 *  [{
 *  "itemPropLabel": "企业名称",
 *   "itemPropName": "entname",
 *   "itemPropValue": "大唐时代节能科技有限公司唐山分公司",    => {entname:"大唐时代节能科技有限公司唐山分公司",entnameLabel:"企业名称"}
 *   "set": false
 *   }]
 *
 *
 */

function type(o) {
    return Object.prototype.toString.call(o).slice(8, -1)
}

function isArray(any) {
    return type(any) === 'Array'
}

function isObject(any) {
    return type(any) === 'Object'
}

/**
 *  将数组转换为对象
 * @param data 数据
 * @param map map数据字段命名 默认 map
 * @param label label字段对应关系命名 默认 label
 * @param source source 是否导出字段名 默认 false 只显示数据
 * @param arrayLabel 字段名是否为数组 默认 false 显示为对象
 * @returns {*}
 */
function parseObject({data, map = 'map', label = 'label', source = false, arrayLabel = false}) {
    if (!isArray(data)) return data;
    const sourceObject = data.reduce((total, currentValue) => {
        // 判断 itemPropValue 类型 数组类型-数组 对象类型-数组 字符串或数字
        const isObjectArray = isArray(currentValue.itemPropValue) && isObject(currentValue.itemPropValue[0]);
        const isArrayArray = isArray(currentValue.itemPropValue) && isArray(currentValue.itemPropValue[0]);
        if (isObjectArray) {
            total[map][currentValue.itemPropName] = parseObject({data: currentValue.itemPropValue});
            total[label][currentValue.itemPropName] = parseObject({
                data: currentValue.itemPropValue,
                source: true,
                label,
                arrayLabel
            })[label];
        } else if (isArrayArray) {
            total[map][currentValue.itemPropName] = parseArray({data: currentValue.itemPropValue});
            total[label][currentValue.itemPropName] = parseArray({
                data: currentValue.itemPropValue,
                source: true,
                label,
                arrayLabel
            })[label];
        } else {
            total[map][currentValue.itemPropName] = currentValue.itemPropValue || '';
            total[label][currentValue.itemPropName] = currentValue.itemPropLabel || '';
        }
        return total
    }, {[map]: {}, [label]: {}});
    if (source) {
        return sourceObject
    }
    return sourceObject[map]
}

/**
 *  解析为数组
 * @param data 数据
 * @param map map数据字段命名 默认 map
 * @param label label字段对应关系命名 默认 label
 * @param source source 是否导出字段名 默认 false 只显示数据
 * @param arrayLabel 字段名是否为数组 默认 false 显示为对象
 * @returns {*}
 */
function parseArray({data, map = 'map', label = 'label', source = false, arrayLabel = false}) {
    if (!isArray(data) && !isArray((data || [])[0])) return data;
    const sourceObject = data.reduce((total, currentValue) => {
        total[map] = [...total[map], parseObject({data: currentValue})];
        if (arrayLabel) {
            total[label] = [...total[label], parseObject({data: currentValue, source: true}).label];
        } else {
            if (!total[label].length) {
                total[label] = parseObject({data: currentValue, source: true}).label
            }
        }
        return total
    }, {[map]: [], [label]: arrayLabel ? [] : {}});
    if (source) {
        return sourceObject
    }
    return sourceObject[map]
}

