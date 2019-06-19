const user = {
    id:1,
    email:'test@test',
    info:{
        name:'tom',
        address:{
            city:'hangzhou',
            state:'0'
        }
    }
};

/*
*  一般情况下访问city
* */

// const city = user.info.address.city;

/*
* 这种访问的方法很可能发生
* Cannot read property 'city' of undefined
* 如何避免这种情况发生？
* */

// 一般处理方法
/*
let city
if(
    user &&
    user.info &&
    user.info.address
){
    city = user.info.address.city
}
*/

/*
*  这种方法处理看起来很混乱
*  另一种方法
* */

// const city = (((user || {}).info || {}).address || {}).city

/*
* 这种方法不是很好理解
* 不能处理嵌套数组
* */

const userList = [
    {
        id:1,
        email:'test@test01',
        info:{
            name:'tom01',
            address:{
                city:'hangzhou01',
                state:'01'
            }
        }
    },
    {
        id:2,
        email:'test@test02',
        info:{
            name:'tom02',
            address:{
                city:'hangzhou02',
                state:'02'
            }
        }
    },
    {
        id:3,
        email:'test@test03',
        info:{
            name:'tom03',
            address:{
                city:'hangzhou03',
                state:'03'
            }
        }
    }
]

// 使用数组reduce访问嵌套对象
const getSaveObj = (obj,pathArr) => {
    return pathArr.reduce((item, key) =>{
        return (item && item[key] !== 'undefined') ? item[key] : null
    }, obj);
}

const city = getSaveObj(user, ['info', 'address','city']);
console.log(city);

const city02 = getSaveObj(userList,[2,'info','address','city']);
console.log(city02);


