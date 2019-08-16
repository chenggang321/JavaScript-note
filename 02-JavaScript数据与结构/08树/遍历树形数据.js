let treeData = {
    id: 0,
    name: '00',
    children: [
        {
            id: 1,
            name: '01',
            children: [
                {
                    id: 11,
                    name: '11',
                    children: []
                }]
        },
        {
            id: 2,
            name: '02',
            children: [
                {
                    id: 22,
                    name: '22',
                    children: []
                }]
        }]
}
// 深度遍历
function stackTreeEach(data){
    let stack = [];
    stack.push(data);
    while (stack.length) {
        let item = stack.pop();
        (item.children || []).forEach((i)=> stack.push(i))
        console.log(item);
    }
}
stackTreeEach(treeData);

// 广度遍历
function queueTreeEach(data){
    let queue = [];
    queue.push(data);
    while (queue.length){
        let item = queue.shift();
        (item.children||[]).forEach((i)=>queue.push(i));
        console.log(item);
    }
}
queueTreeEach(treeData);
