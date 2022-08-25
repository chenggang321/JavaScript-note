# struct
struct 翻译过来叫结构体，它类似于js 里的构造函数，只是语法规则不一样。

## 1.struct 的建立
```gl
struct Light{
    vec4 color;
    vec3 pos;
};
```
上面的struct 类似于js 的function，color和pos 既是结构体的属性，也使其形参。


## 2.struct 的实例化
```gl
Light l1=Light(
    vec4(255,255,0,255),
    vec3(1,2,3)
);
```
上面的vec4()和vec3()数据是结构体的实参，分别对应color属性和pos属性。

## 3.访问struct 实例对象中的属性
```gl
gl_FragColor=l1.color/255.0;
```
