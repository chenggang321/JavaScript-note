var currentEffect;
var effectMap = new Map();
function reactive(obj) {
    var proxied = new Proxy(obj, {
        get: function (target, key, receiver) {
            if (currentEffect) {
                if (effectMap.has(key)) {
                    var effects = effectMap.get(key);
                    if (effects.indexOf(currentEffect) === -1) {
                        effects.push(currentEffect);
                    }
                }
                else {
                    effectMap.set(key, [currentEffect]);
                }
            }
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            var result = Reflect.set(target, key, value, receiver);
            if (effectMap.has(key)) {
                effectMap.get(key).forEach(function (effect) { return effect(); });
            }
            return result;
        }
    });
    return proxied;
}
function effect(fn) {
    var effected = function () {
        fn();
    };
    currentEffect = effected;
    effected();
    currentEffect = undefined;
    return effected;
}
var state = reactive({
    foo: 0
});
var $counter = document.querySelector(".counter");
var $inc = document.querySelector(".inc");
var $dec = document.querySelector(".dec");
$inc.addEventListener("click", function () { return state.foo++; });
$dec.addEventListener("click", function () { return state.foo--; });
effect(function () {
    $counter.textContent = state.foo;
});
