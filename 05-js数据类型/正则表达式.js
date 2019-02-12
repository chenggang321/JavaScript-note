/*
 *  1.RegExp对象
 * */

// 字面量
// var reg = /all/

// 构造函数
// var reg2 = new RegExp('all')

/*
 * 2.元字符
 * */
// 原意文本字符 代表它本来含义的字符。 eg /abc/ -> abc
// 元字符 在正则表达式中，有特殊含义的非数字字符。 eg \b \d \w . + ()
// 元字符集 http://tool.oschina.net/uploads/apidocs/jquery/regexp.html
// 工具 https://regexper.com

/*
 * 3.量词
 * */
// + 出现一次或多次（至少出现一次）
// ? 出现零次或一次 （最多出现一次）
// * 出现零次或多次（任意次）
// {n} 出现n次
// {n,m} 出现n到m次
// {n,} 至少出现n次

/*
 * 4.贪婪模式和非贪婪模式
 * */
// 默认为贪婪模式 在量词后加 ? 则为非贪婪模式

/*
 * 5.类 []
 * */
// 在正则表达式中，可以用[]来构建一个类，正则表达适中的类是指符合某些特性的对象
// 字符类 eg [abcd] -> 可匹配 a,b,c,d
// 范围类 [a-z] -> 可匹配a 到 z 中的任意字符
// 预定义类
// \d - [0-9] - 数字字符
// \D - [^0-9] - 非数字字符
// \w - [a-zA-Z0-9_] - 字母、数字、下划线（单词字符）
// \W - [^a-zA-Z0-9] - 非字母、数字、下划线（非单词字符）
// \s - [\t\n\x0B\f\r] - 空白字符
// \S - [^\t\n\x0B\f\r] - 非空白字符
// . - [^\n\r] - 除了换行、回车之外的任意字符

/*
 * 6.边界
 * */
// ^ - 以某某开头
// $ - 以某某结尾
// \b - 单词边界
// \B - 非单词边界

/*
 * 7.分组 ()
 * */
// 与|使用
// /http(|s):\/\// 匹配 http:// 或 https://

// 与量词使用 如何匹配testtest
// test{2} 匹配 testt 不能匹配 testtest
// (test){2} 匹配 testtest

// 反向引用(含有分组的正则表达式匹配成功时，将子表达式匹配到的内容，
// 保存到内存中一个以数字编号的组里，可以简单的认为是对一
// 个局部变量进行了赋值，这时就可以通过反向引用方式，引用
// 这个局部变量的值。)
// eg 将05/28/2018转换为2018-05-28
// '05/28/2018'.replace(/(\d{2})\/(\d{2})\/(\d(4))/,'$3-$1-$2')

// 忽略分组（有时候我们在写正则表达式的时候会多次使用分组，但有一些分
// 组是不需要反向引用的，比如正则表达式 /http(|s):\/\// 中的分组，
// 我们不需要进行反向引用，这时候我们应该使用 (?:) 来忽略分组）
// eg 不忽略分组 /http(|s):\/\//
// eg 忽略分组 /http(?:|s):\/\//

/*
 * 8.前瞻后顾
 * */
// 正则表达式是从头部(左)向尾部(右)开始匹配的，文本的尾部方向称为“前”，
// 文本的头部方向称为“后”
// 前瞻：正则表达式在匹配到规则的时候，向前检查是否符合断言
// 后顾：正则表达式在匹配到规则的时候，向后检查是否符合断言

// 正向前瞻 - exp(?=assert) - 向前检查符合断言的
// 'a1'.replace(/[a-z](?=\d)/g, 'X'); // X1

// 负向前瞻 - exp(?!assert) - 向前检查不符合断言的
// 'ba1'.replace(/[a-z](?!\d)/g, 'X'); // Xa1

// 正向后瞻 - (?<=assert)exp - 向后检查符合断言的
// 'ab1cde2fg'.replace(/(?<=\d)[a-z]/g, 'X'); // ab1Xde2Xg

// 负向后瞻 - (?<!assert)exp - 向后检查不符合断言的
// 'ab1cde2fg'.replace(/(?<!\d)[a-z]/g, 'X'); // XX1cXX2fX

/*
 * 9.修饰符
 * */
// global: 是否全文搜索，默认 false
// ignoreCase: 是否大小写敏感，默认 false
// multiline: 是否多行搜索，默认 false
// lastIndex: 是当前表达式匹配内容的最后一个字符的下一个位置
// source: 正则表达式的文本字符

/*
 *10.RegExp对象中 test() 和 exec()
 * */
// test() (用于测试参数字符串中是否存在匹配正则表达式模式的字符串；
// 如果存在则返回true，否则返回false)
// exec() (使用正则表达式模式对字符串执行搜索，并将匹配到的结果以数组形式返回，
// 如果没有匹配，返回null)

// 应用-正则格式化日期
function formDate(str,sign){
    let start = 0,
        reg = /(yy)|(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g;
    sign.replace(reg,function(match){
        let end = start+match.length,
            strDate = str.substring(start,end);
        start = end;
        sign = sign.replace(match,strDate);
    });
    return sign
}
console.log(formDate("20180913000000",'yyyy-MM-dd hh:mm:ss'));
console.log(formDate("20180818172930",'yyyy/MM/dd hh:mm:ss'));
console.log(formDate("180818172930",'yy/MM/dd hh:mm:ss'));
console.log(formDate("20180818172930",'今天是yyyy年MM月dd日 hh:mm:ss'));