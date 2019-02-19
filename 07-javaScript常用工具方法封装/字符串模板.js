String.prototype.render = function(context){
    return this.replace(/{{(.*?)}}/g,(match,key)=>context[key.trim()])
}
/*
* test
* */
console.log("{{ name }}的年龄是{{ age }}".render({name:'test',age:15}));
