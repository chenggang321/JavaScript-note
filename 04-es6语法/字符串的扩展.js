/*
* 1.字符的Unicode表示法
* 2.codePointAt()
* 3.String.fromCodePoint()
* 4.字符串遍历器接口
* 5.normalize()
* 6.includes(),startsWidth(),endsWidth()
* 7.repeat()
* 8.padStart(),padEnd()
* 9.matchAll()
* 10.模板字符串
* 11.实例：模板编译
* 12.标签模板
* 13.String.raw()
* 14.模板字符串的限制
* */

// 1.字符的Unicode表示法
console.log('\u0061'); // a
// 但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用
// 两个双字节表示

// es6 做出了改进，只要将码点放入大括号，就能正确解读该字符
console.log('\u{1F680}' === '\uD83D\uDE80'); // true

// 2.codePointAt()
// javaScript 内部，字符以UTF-16的格式存储，每个字符固定为2个字节。对于那些需要4个
// 字节存储的字符（Unicode 码点大于0xFFFF字符），Javascript会认为他们是两个字符。

// codePoint方法是测试一个字符串由两个字符还是由四个字符组成的最简单方法
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFF
}

console.log(is32Bit("𠮷"));// true
console.log(is32Bit('a'));// false

// 3.String.fromCodePoint()
// es5 提供string.from方法，用于码点返回对应字符，但是这个方法不能识别32位的UTF-16字符
// es6 提供String.fromCodePoint()方法正好与codePointAt相反

// 4.字符串的遍历器接口
for (let codePoint of 'foo') {
    console.log(codePoint);
}// "f" "o" "o"

// 5.normalize()
// 用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化
'\u01D1'.normalize() === '\u004F\u030C'.normalize(); // true

// 6.includes(),startWidth(),endsWidth()
/*
*  includes():返回布尔值，表示是否找到了参数字符
*  startsWidth():返回布尔值，表示数字字符串是否在原字符的头部
*  endsWidth():返回布尔值，表示参数数字字符串是否在原字符串的尾部
* */

let s = 'hello world!';
console.log(s.startsWith('hello')); // true
console.log(s.endsWith('!')); // true
console.log(s.includes('o')); // true

// 7.repeat()
// 放回一个新字符串，表示将原字符串重复n次
console.log('x'.repeat(3)); // xxx

// 8.padStart,padEnd()
// ES2017引入了字符串补全长度功能。如果某个字符串不够指定长度，会在头部或尾部补全
// padStart()用于头部补全，padEnd() 用于尾部补全
// 浏览器未实现
// console.log('x'.padStart(5,'ab'));// ababx
// console.log('x'.padEnd(5,'ab'));// xabab

// 9.matchAll()
// matchAll 方法返回一个正则表达式在当前字符串的所有字符串的匹配

// 10.模板字符串
/*
*  模板字符串内可以做
*  运算，引用属性
*  调用函数
*  可以嵌套
*
* */
let name = 'marry';
console.log(`my name is ${name}`); // my name is marry

// 11.实例：模板编译

let template = `
    <ul>
        <% for(let i=0; i < data.supplies.length; i++) { %>
            <li><%= data.supplies[i] %></li>
        <% } %>
    </ul>
`;

function compile(template) {
    const evalExpr = /<%=(.+?)%>/g;
    const expr = /<%([\s\S]+?)%>/g;

    template = template
        .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        .replace(expr, '`); \n $1 \n  echo(`');

    template = 'echo(`' + template + '`);';

    let script =
        `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${template}

    return output;
  })`;
    return script;
}

let parse = eval(compile(template));
let templateStr = parse({supplies: ["broom", "mop", "cleaner"]});
console.log(templateStr);