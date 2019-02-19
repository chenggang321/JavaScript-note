// 私有方法
const sayName = Symbol('sayName');
class Person {
    // 静态属性
    static type = 'person';
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    // 静态方法
    static sayAge(){
        console.log(Person.type)
    }
    // 公有方法
    toString(){
        return `{name:${this.name},age:${this.age}}`
    }
    // 私有方法
    [sayName](){
        console.log(this.name);
    }
}

// 调用静态属性
console.log(Person.type); // person

// 调用静态方法
Person.sayAge(); // person

let person = new Person('tom',25);
console.log(person);

// 调用公有方法
console.log(person.toString()); //{name:tom,age:25}

// 调用私有方法
// person.sayName(); // 报错

class China extends Person{
    constructor(name,age,color){
        super(name,age);
        this.color = color;
    }
    toString() {
        let result = Object.keys(this).reduce((total,item,index)=>{
            if(index === 1){
                total = `${total}:${this[total]}`
            }
            return total + `,${item}:${this[item]}`
        })
        return `{${result}}`
    }
}

let china = new China('marry',26,'yellow');
console.log(china.toString());



