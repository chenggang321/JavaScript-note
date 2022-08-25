/*
在实现文字过滤的算法中，DFA是唯一比较好的实现算法。
DFA 全称为：Deterministic Finite Automaton，即确定有穷自动机。
其特征为：有一个有限状态集合和一些从一个状态通向另一个状态的边，每条边上标记有一个符号，其中一个状态是初态，某些状态是终态。
但不同于不确定的有限自动机，DFA 中不会有从同一状态出发的两条边标志有相同的符号。
简单点说就是，它是是通过 event 和当前的 state 得到下一个 state，即 event + state= nextstate。
理解为系统中有多个节点，通过传递进入的 event，来确定走哪个路由至另一个节点，而节点是有限的。
 */

// 应用敏感词过滤
/*
1. 敏感词库构造
{
    "王":{
        "isEnd":"0",
        "八":{
            "羔":{
                "子":{
                    "isEnd":"1"
                },
                "isEnd":"0"
            },
            "isEnd":"0",
            "蛋":{
                "isEnd":"1"
            }
        }
    }
}
 */

// 生成词库
function addSensitiveWordToHashMap(keyWords = []) {
    let res = {}
    keyWords.forEach(keyword => {
        let now = res
        for (let i = 0; i < keyword.length; i++) {
            let keyChar = keyword[i]
            let work = now[keyChar];
            if (work != null) {
                now = work;
            } else {
                let newWork = {};
                newWork["isEnd"] = "0";
                now[keyChar] = newWork;
                now = newWork;
            }
            if (i === keyword.length - 1) {
                now["isEnd"] = "1";
            }
        }
    })
    return res
}

// const keyWords = ['王八']
// const keyWords = ['王八蛋', '王八羔子']
const keyWords = ['日本人', '日本鬼子', '中国人']
const wordObj = addSensitiveWordToHashMap(keyWords)
console.log(JSON.stringify(wordObj))

// 查找字符串中是否包含敏感字符
function findSensitiveWord(txt) {
    let sensitiveWordMap = addSensitiveWordToHashMap(keyWords)
    console.log(sensitiveWordMap)
    let sensitiveWord = '';
    // 敏感词结束标志位，表示匹配到了最后一位
    let flag = false;
    for (let i = 0; i < txt.length; i++) {
        let word = txt[i];
        console.log(word)
        // 获取指定 key
        sensitiveWordMap = sensitiveWordMap[word];
        // 不存在，直接返回没有敏感词
        if (sensitiveWordMap == null) {
            break;
        }else{
            //存在，存储该敏感词，并判断是否为最后一个
            sensitiveWord += word;
            //如果为最后一个匹配规则，结束循环
            if (sensitiveWordMap["isEnd"] === '1') {
                flag = true;
                break;
            }
        }

    }
    // 表示匹配到了完整敏感词
    if (flag) {
        return sensitiveWord;
    }
    return false;
}
const test = "安达市大日本鬼子ad啊阿斯达按时"
const res = findSensitiveWord(test)
console.log(res)




