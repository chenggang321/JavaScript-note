// 简单值
// "Hello world"
// 对象
/*
{
    "name": "Nicholas",
    "age": 29
}
*/
// 数组
// [25, "hi", true]

// 复合
/*
[
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        edition: 3,
        year: 2011
    },
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        edition: 2,
        year: 2009
    },
    {
        "title": "Professional Ajax",
        "authors": [
            "Nicholas C. Zakas",
            "Jeremy McPeak",
            "Joe Fawcett"
        ],
        edition: 2,
        year: 2008
    },
    {
        "title": "Professional Ajax",
        "authors": [
            "Nicholas C. Zakas",
            "Jeremy McPeak",
            "Joe Fawcett"
        ],
        edition: 1,
        year: 2007
    },
    {
        "title": "Professional JavaScript",
        "authors": [
            "Nicholas C. Zakas"
        ],
        edition: 1,
        year: 2006
    }
]
*/

// 解析与序列化
/*
*  JSON.stringify() 转化为json字符串
*  JSON.parse() 解析json字符串
* */
var book = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas",
        "aaaa",
        "bbbb"
    ],
    edition: 3,
    year: 2011
};
var jsonText = JSON.stringify(book, function(key, value){
    switch(key){
        case "authors":
            return value.join(",")
        case "year":
            return 5000;
        case "edition":
            return undefined;
        default:
            return value;
    }
});
console.log(jsonText)
//{"title":"Professional JavaScript","authors":"Nicholas C. Zakas,aaaa,bbbb","year":5000}

var book2 = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011,
    releaseDate: new Date(2011, 11, 1)
};
var jsonText2 = JSON.stringify(book2);
var bookCopy2 = JSON.parse(jsonText2, function(key, value){
    if (key === "releaseDate"){
        return new Date(value);
    } else {
        return value;
    }
});
console.log(bookCopy2)
