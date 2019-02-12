/*
 * 数据格式化
 * 将源数据格式化为树形结构
 *
 * [
 *   {
 *       name:"浙江省",
 *       child:[
 *           {
 *               name:"杭州市",
 *               child:[
 *                   {
 *                       name:"西湖区"
 *                   },
 *                   {
 *                       name:"下沙区"
 *                   },
 *                   ...
 *               ]
 *           },
 *           ...
 *       ]
 *   },
 *   {
 *       name:"安徽省",
 *       child:[
 *           {
 *               name:"合肥市",
 *               child:[
 *                   {
 *                       name:"包河区"
 *                   }
 *                   ...
 *               ]
 *           },
 *           ...
 *       ]
 *   },
 *   ...
 * ]
 * */


// 源数据
var oData = [
    {
        areid: 1,
        province: "浙江省",
        city: "杭州市",
        district: "西湖区"
    },
    {
        areid: 2,
        province: "浙江省",
        city: "杭州市",
        district: "下沙区"
    },
    {
        areid: 2,
        province: "浙江省",
        city: "杭州市",
        district: "XXX区"
    },
    {
        areid: 145,
        province: "浙江省",
        city: "宁波市",
        district: "慈溪市"
    },
    {
        areid: 7,
        province: "安徽省",
        city: "合肥市",
        district: "包河区"
    },
    {
        areid: 9,
        province: "江苏省",
        city: "江苏的市",
        district: "xx区"
    },
    {
        areid: 5,
        province: "河北省",
        city: "河北的市",
        district: "河北的区"
    }
];

function compileData(data) {
    var res = [];
    var province = [];

    // 节点函数
    function Node(name, hasChild) {
        this.name = name === undefined ? "" : name;
        hasChild = hasChild === undefined ? true : hasChild;
        if (hasChild) {
            this.child = [];
        }
    }

    // 去重 province
    data.forEach(function (item) {
        if (province.indexOf(item.province) < 0) {
            province.push(item.province);
        }
    });
    // 创建简单结果
    province.forEach(function (ipro) {
        res.push(new Node(ipro));
    });
    //创建二级数据
    res.forEach(function (ires) {
        // 筛选省
        var city = data.filter(function (idata) {
            return ires.name === idata.province;
        });
        // 去重 city
        city = city.filter(function (icity, index, array) {
            return icity.city !== (array[index + 1] && array[index + 1].city)
        });
        //创建市
        city.forEach(function (icity) {
            ires.child.push(new Node(icity.city));
        });
    });

    //创建三级数据
    res.forEach(function (ires) {
        ires.child.forEach(function (icity) {
            //筛选区
            var datadistrict = data.filter(function (idata) {
                return idata.city === icity.name;
            });
            datadistrict.forEach(function (idis) {
                icity.child.push(new Node(idis.district,false));
            });
        });
    });
    return JSON.parse(JSON.stringify(res));
}
console.log(compileData(oData));

