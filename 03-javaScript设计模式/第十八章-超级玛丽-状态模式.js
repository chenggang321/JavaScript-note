/**
 * Created by HH_Girl on 2018/2/6.
 */
/*
 * 状态模式：当一个对象内部状态发生改变时，会导致其行为的改变，
 * 这看起来像是改变了对象
 * */
//投票结果状态对象
var ResultState = function () {
    //判断结果每个状态作为一个独立方法保存
    var States = {
        state0: function () {
            //处理结果0
            console.log('这是第一种情况');
        },
        state1: function () {
            //处理结果1
            console.log('这是第二种情况');
        },
        state2: function () {
            //处理结果2
            console.log('这是第三种情况');
        },
        state3: function () {
            //处理结果3
            console.log('这是第四种情况');
        }
    };
    //获取某一种状态并执行其对应的方法
    function show(result) {
        States['state' + result] && States['state' + result]();
    }

    return {
        //返回调用状态方法接口
        show: show
    }
}();
//展示state3
ResultState.show(3);//这是第四种情况
//创建超级玛丽状态类
var MarryState = function () {
    //内部状态私有变量
    var _currentState = {},
        //动作与状态方法映射
        states = {
            jump: function () {
                //跳跃
                console.log('jump');
            },
            move: function () {
                //移动
                console.log('move');
            },
            shoot: function () {
                //射击
                console.log('shoot');
            },
            squat: function () {
                //蹲下
                console.log('squat');
            }
        };
    //动作控制类
    var Action = {
        //改变状态方法
        changeState: function () {
            //组合动作通过传递多个参数实现
            var arg = arguments;
            //重置内部状态
            _currentState = {};
            //如果有动作则添加动作
            if (arg.length) {
                //遍历动作
                for (var i = 0, len = arg.length; i < len; i++) {
                    //向内部状态中添加动作
                    _currentState[arg[i]] = true;
                }
            }
            //返回动作控制类
            return this;
        },
        //执行动作
        goes: function () {
            console.log('触发一次动作');
            //遍历内部状态保存的动作
            for (var i in _currentState) {
                //如果该动作存在则执行
                states[i] && states[i]();
            }
            return this;
        }
    };
    //返回接口方法 change ，goes
    return {
        change: Action.changeState,
        goes: Action.goes
    }
};

var marry = new MarryState();
marry
    .change('jump', 'shoop')//添加跳跃与射击动作
    .goes()//执行动作
    .goes()//执行动作
    .change('shoot')//添加射击动作
    .goes();//执行动作