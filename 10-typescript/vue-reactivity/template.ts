type Effect = Function;
type EffectMap = Map<string, Effect[]>;

let currentEffect: any;
let effectMap: EffectMap = new Map();

function reactive(obj: any) {
    const proxied = new Proxy(obj, {
        get: function(target, key: string, receiver) {
            if (currentEffect) {
                if (effectMap.has(key)) {
                    const effects = effectMap.get(key);
                    if (effects.indexOf(currentEffect) === -1) {
                        effects.push(currentEffect);
                    }
                } else {
                    effectMap.set(key, [currentEffect]);
                }
            }

            return Reflect.get(target, key, receiver);
        },
        set: function(target, key: string, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);

            if (effectMap.has(key)) {
                effectMap.get(key).forEach(effect => effect());
            }

            return result;
        }
    });

    return proxied;
}

function effect(fn: Function) {
    const effected = function() {
        fn();
    };

    currentEffect = effected;
    effected();
    currentEffect = undefined;

    return effected;
}

const state = reactive({
    foo: 0
});

const $counter = document.querySelector(".counter");
const $inc = document.querySelector(".inc");
const $dec = document.querySelector(".dec");

$inc.addEventListener("click", () => state.foo++);
$dec.addEventListener("click", () => state.foo--);

effect(() => {
    $counter.textContent = state.foo;
});
