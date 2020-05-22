/**
 *  沙箱模式
 *  通过沙箱隔离Windows对象的污染
 *
 *  实现方式
 *  1.基于proxy实现
 *  2.通过快照方式实现
 */

// 是否为构造函数
function isContructable(fn) {
    const constructableFunctionRegex = /^function\b\s[A-Z].*/;
    const classRegex = /^class\b/;

    // 有 prototype 并且 prototype 上有定义一系列非 constructor 属性，则可以认为是一个构造函数
    return (
        fn.prototype && Object.getOwnPropertyNames(fn.prototype).filter(k => k !== 'constructor').length ||
        constructableFunctionRegex.test(fn.toString()) || classRegex.test(fn.toString())
    )
}

/**
 * Object.getOwnPropertyDescriptor(obj, prop)
 * param obj 需要查找的目标对象
 * param prop 目标对象内属性名称
 * returns  如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。
 *
 * 属性描述符”（property descriptor）
 * value 该属性的值(仅针对数据属性描述符有效)
 * writable 当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)
 * get 获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
 * set 获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
 * configurable 当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
 * enumerable 当且仅当指定对象的属性可以被枚举出时，为 true。
 */

// 对象属性是否可以被改变 默认为true
function isPropConfigurable(target, prop) {
    const descriptor = Object.getOwnPropertyDescriptor(target, prop);
    return descriptor ? descriptor.configurable : true;
}

// 设置window对象属性值
function setWindowProp(prop, value, toDelete) {
    if (value === void 0 && toDelete) {
        delete window[prop]
    } else if (isPropConfigurable(window, prop) && typeof prop !== 'symbol') {
        // 如果prop在window上可被改变且不为symbol类型,设置属性信息，设置值
        Object.defineProperty(window, prop, {writable: true, configurable: true});
        window[prop] = value;
    }
}

// 基于proxy实现

/**
 *
 *  实现原理
 *
 *  proxy 劫持对window对象set get 操作
 *
 *  addedPropsMapInSandbox （添加）
 *  modifiedPropsOriginalValueMapInSandbox （更新）
 *  currentUpdatedPropsValueMap（记录）
 *  三个map记录对window对象的修改。
 *
 *
 *
 *  active 还原修改 （还原为沙箱状态）
 *  inactive 移除修改 （移除沙箱添加修改状态）
 */

// 单实例沙箱
class LegacyProxySandbox {
    constructor(name) {
        this.name = name;
        // 沙箱期间新增的全局变量
        this.addedPropsMapInSandbox = new Map();
        // 沙箱期间更新的全局变量
        this.modifiedPropsOriginalValueMapInSandbox = new Map();
        // 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot
        this.currentUpdatedPropsValueMap = new Map();
        this.sandboxRunning = true;
        this.boundValueSymbol = Symbol('bound value');
        // 真实window快照
        this.rawWindow = window;
        // 代理window对象
        this.fakeWindow = Object.create(null);

        const {
            sandboxRunning,
            addedPropsMapInSandbox,
            modifiedPropsOriginalValueMapInSandbox,
            currentUpdatedPropsValueMap,
            boundValueSymbol,
            rawWindow,
            fakeWindow
        } = this;

        const proxy = new Proxy(fakeWindow, {
            set(window, property, value) {
                if (sandboxRunning) {
                    // 如果沙箱在启动中
                    if (!rawWindow.hasOwnProperty(property)) {
                        // 如果当前window对象中不存在该属性，则将属性和值存入沙箱新增map中
                        addedPropsMapInSandbox.set(property, value);
                    } else if (!modifiedPropsOriginalValueMapInSandbox.has(property)) {
                        // 如果当前window对象中不存在该属性且
                        // 沙箱更新map中不存在该属性，则记录该属性初始值
                        const originalValue = rawWindow[property];
                        modifiedPropsOriginalValueMapInSandbox.set(property, originalValue);
                    }
                    // 记录修改属性和值放入沙箱记录map中
                    currentUpdatedPropsValueMap.set(property, value);

                    // 将修改的值放入window中
                    rawWindow[property] = value;

                    return true;
                }

                // 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
                return true;
            },

            get(window, property) {
                // 避免通过window.top、window.window、 window.self 修改沙箱环境
                if (property === 'top' || property === 'window' || property === 'self') {
                    return proxy;
                }

                const value = rawWindow[property];
                /*
                    仅绑定 !isConstructable && isCallable 的函数对象，如 window.console、window.atob 这类。
                    目前没有完美的检测方式，这里通过 prototype 中是否还有可枚举的拓展方法的方式来判断
                    @warning 这里不要随意替换成别的判断方式，因为可能触发一些 edge case（
                    比如在 lodash.isFunction 在 iframe 上下文中可能由于调用了 top window 对象触发的安全异常）
                */
                if (typeof value === 'function' && !isContructable(value)) {
                    if (value[boundValueSymbol]) {
                        return value[boundValueSymbol];
                    }

                    const boundValue = value.bind(rawWindow);

                    // 有些回调函数具有自定义字段，需要将其放入boundValue中
                    Object.keys(value).forEach(key => (boundValue[key] = value[key]));
                    Object.defineProperty(value, boundValueSymbol, {enumerable: false, value: boundValue});
                }

                return value;
            },
            // has方法用来拦截hasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。
            // 典型的操作就是in运算符。
            has(window, property) {
                return property in window
            }
        });

        this.proxy = proxy;
    }

    // 激活
    active() {
        if (!this.sandboxRunning) {
            this.currentUpdatedPropsValueMap.forEach((v, p) => setWindowProp(p, v))
        }
    }

    // 卸载
    inactive() {
        // 恢复window对象上设置的值
        this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) => setWindowProp(p, v));
        // 移除window对象上新添加的值
        this.addedPropsMapInSandbox.forEach((v, p) => setWindowProp(p, void 0, true));

        this.sandboxRunning = false;
    }
}

/**
 *  基于proxy多例沙盒实现原理
 *  updatedValueSet 记录沙箱值
 *  沙箱开启时优先从updatedValueSet中取值，updatedValueSet中没有时从window中取值
 *  沙箱关闭时直接从window中取值
 */

// 防止 defineProperty 被重写
const rawObjectDefineProperty = Object.defineProperty;


function createFakeWindow(global) {
    const fakeWindow = {};
    Object.getOwnPropertyNames(global)
        .filter(p => {
            // 过滤不可修改的属性
            const descriptor = Object.getOwnPropertyDescriptor(global, p);
            return !(descriptor || {}).configurable;
        })
        .forEach(p => {
            const descriptor = Object.getOwnPropertyDescriptor(global, p);
            // 确保top/self/window属性是可被修改的
            if (p === 'top' || p === 'self' || p === 'window') {
                descriptor.configurable = true;
                if (!Object.prototype.hasOwnProperty.call(descriptor, 'get')) {
                    descriptor.configurable = true;
                }
            }

            rawObjectDefineProperty(fakeWindow, p, Object.freeze(descriptor));
        });
    return fakeWindow;
}

function interceptSystemJsProps(property, value) {
    if (property === 'System') {
        window.System = value;
    }
    if (property === '__cjsWrapper') {
        window.__cjsWrapper = value;
    }
}

function clearSystemJsProps(global, allInactive) {
    if (!allInactive) return;

    if (global.hasOwnProperty('System')) {
        delete window.System;
    }

    if (global.hasOwnProperty('__cjsWrapper')) {
        delete window.__cjsWrapper;
    }
}

const proxyGetter = new Map();

function getProxyPropertyGetter(proxy, property) {
    const getter = proxyGetter.get(proxy) || {};
    return getter[property];
}

function setProxyPropertyGetter(proxy, property, getter) {
    const prevGetters = proxyGetter.get(proxy) || {};
    proxyGetter.set(proxy, {...prevGetters, [property]: getter})
}

const boundValueSymbol = Symbol('bound value');

function getTargetValue(target, value) {
    if (typeof value === 'function' && !isContructable(value)) {
        if (value[boundValueSymbol]) {
            return value[boundValueSymbol]
        }

        const boundValue = value.bind(target);

        Object.keys(value).forEach(key => (boundValue[key] = value[key]));
        Object.defineProperty(value, boundValueSymbol, {enumerable: true, value: boundValue});

        return boundValue;
    }

    return value;
}

// 数组去重
function uniq(array){
    return Array.from(new Set(array));
}

let activeSandboxCount = 0;

// 多实例沙箱
class ProxySandbox {
    constructor(name) {
        this.name = name;
        this.sandboxRunning = true;
        // window 值变更记录
        this.updatedValueSet = new Set();

        const {sandboxRunning, updatedValueSet} = this;

        // window 对象
        const rawWindow = window;
        // window 对象快照
        const fakeWindow = createFakeWindow(rawWindow);
        const proxy = new Proxy(fakeWindow, {
            set(target, property, value) {
                if (sandboxRunning) {
                    target[property] = value;
                    updatedValueSet.add(property);

                    interceptSystemJsProps(property, value);

                    return true;
                }

                // 在 strict-mode 下，Proxy 的 handler.set 返回 false
                // 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
                return true;
            },
            get(target, property) {
                // 防止window.top/window.window/window.self 修改window对象
                if (property === 'top' || property === 'window' || property === 'self') {
                    return proxy;
                }

                if (property === 'hasOwnProperty') {
                    return key => target.hasOwnProperty(key) || rawWindow.hasOwnProperty(key);
                }

                const proxyPropertyGetter = getProxyPropertyGetter(proxy, property);
                if (proxyPropertyGetter) {
                    return proxyPropertyGetter();
                }

                const value = target[property] || rawWindow[property]

                return getTargetValue(rawWindow,value);
            },
            // has方法用来拦截hasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。
            // 典型的操作就是in运算符。
            has(target,property){
                return property in target || property in window;
            },
            getOwnPropertyDescriptor(target,property){
                if(target.hasOwnProperty(property)){
                    return Object.getOwnPropertyDescriptor(target,property);
                }
                if(rawWindow.hasOwnProperty(property)){
                    return Object.getOwnPropertyDescriptor(rawWindow,property);
                }

                return void 0;
            },
            ownKeys(target){
                return uniq([...Reflect.ownKeys(rawWindow),...Reflect.ownKeys(target)])
            },
            deleteProperty(target,property){
                if(target.hasOwnProperty(property)){
                    delete target[property];
                    updatedValueSet.delete(property);

                    return true;
                }

                return true;
            }
        });

        this.proxy = proxy;
    }
    active(){
        this.sandboxRunning = true;
        activeSandboxCount++;
    }
    inactive(){
        clearSystemJsProps(this.proxy,--activeSandboxCount === 0);
        this.sandboxRunning = false;
    }
}




