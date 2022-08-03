/*
图的定义
图是由顶点(Vertex)和连接顶点的边(Edge)构成的，通常将数据元素称为顶点，顶点之间的关系称为边。
由一条边连接在一起的顶点称为相邻顶点。
一个顶点的度是其相邻顶点的数量
路径是顶点v 1 , v 2 ,…,v k 的一个连续序列，其中v i 和v i+1 是相邻的。(简单路径要求不包含重复的顶点)

有向图和无向图
图可以是无向的（边没有方向）或是有向的（有向图）。
如果图中每两个顶点间在双向上都存在路径，则该图是强连通的。
图还可以是未加权的（目前为止我们看到的图都是未加权的）或是加权的。

解决问题
可以使用图来解决计算机科学世界中的很多问题，比如搜索图中的一个特定顶点或搜索一条特定边，寻找图中的一条路径（从一个顶点到另一个顶点），
寻找两个顶点之间的最短路径，以及环检测。

图的表示
邻接矩阵：每个节点都和一个整数相关联，该整数将作为数组的索引。用一个二维数组来表示顶点之间的连接。
如果索引为i的节点和索引为j的节点相邻，则array[i][j]=== 1，否则array[i][j] === 0
         A                 A  B  C  D  E  F  G  H  I
     /   |   \          A  0  1  1  1  0  0  0  0  0
    B    C  -  D        B  1  0  0  0  1  1  0  0  0
   /  \   \  /  \       C  1  0  0  1  0  0  1  0  0
  E   F    G     H      D  1  0  1  0  0  0  1  1  0
  |                     E  0  1  0  0  0  0  0  0  1
  I                     F  0  1  0  0  0  0  0  0  0
                        G  0  0  1  1  0  0  0  0  0
                        H  0  0  0  1  0  0  0  0  0
                        I  0  0  0  0  1  0  0  0  0
不是强连通的图（稀疏图）如果用邻接矩阵来表示，则矩阵中将会有很多0，这意味着浪费了计算机存储空间来表示根本不存在的边。

邻接表：邻接表由图中每个顶点的相邻顶点列表所组成。存在好几种方式来表示这种数据结构。可以用列表（数组）、链表，甚至是
散列表或是字典来表示相邻顶点列表。下面的示意图展示了邻接表数据结构。
         A              A     B C D
     /   |   \          B     A E F
    B    C  -  D        C     A D G
   /  \   \  /  \       D     A C G H
  E   F    G     H      E     B I
  |                     F     B
  I                     G     C D
                        H     D
                        I     E

广度优先搜索（Breadth-First Search，BFS）A->B->C->D->E->F->G->H->I
 广度优先搜索假设从图中某个顶点v出发，在访问了v之后依次访问v的各个未曾访问过的邻接点，然后再分别从这些邻接点出发依次访问它们的邻接点，
 并使先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问（因此需要用队列来存储顶点），直到图中所有已被访问的顶点的邻接点都被访问为止。
 如果此时图中还有未被访问的顶点，则另选图中未被访问的顶点作为起点，重复上述过程，直到图中所有顶点都被访问为止。

以下是从顶点v开始的广度优先搜索算法所遵循的步骤
 创建一个队列Q。
 将v标注为被发现的（灰色），并将v入队列Q。
 如果Q非空，则运行以下步骤：
 将u从Q中出队列；
 将标注u为被发现的（灰色）；
 将u所有未被访问过的邻点（白色）入队列；
 将u标注为已被探索的（黑色）。

深度优先搜索（Depth-First Search，DFS）
 深度优先搜索假设初始状态下图中所有顶点都未被访问，尝试优先搜索从图中某个顶点v出去，访问此顶点，然后依次从v的未被访问的邻接点出发深度优先遍历图，
 直到图中所有和v相连连的顶点都被访问到。如果此时图中还有没有访问到的顶点，则另选图中未被访问的某顶点作为起始点，重复上述过程，直到图中所有顶点都被访问到。

在深度优先搜索算法中，若图中顶点v未访问，则访问该顶点v。要访问顶点v，照如下步骤做。
 标注v为被发现的（灰色）。
 对于v的所有未访问的邻点w：
 访问顶点w。
 标注v为已被探索的（黑色）。

当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态。
 白色：表示该顶点还没有被访问。
 灰色：表示该顶点被访问过，但并未被探索过。
 黑色：表示该顶点被访问过且被完全探索过。
 注意：这就是之前提到的务必访问每个顶点最多两次的原因。
 */

class Graph {
    constructor() {
        // 顶点
        this.vertexes = [];
        // 边
        this.edges = {};
    }

    // 用颜色标记搜索状态 white -> 未探索    grey -> 已发现   black -> 已探索
    static WHITE = 'white';
    static GREY = 'grey';
    static BLACK = 'black';

    // 添加顶点
    addVertex(vertex){
        this.vertexes.push(vertex)
        this.edges[vertex] = []
    }
    // 添加边
    addEdge(vertexA,vertexB){
        if(this.vertexes.includes(vertexA) && this.vertexes.includes(vertexB)){
            if(!this.edges[vertexA].includes(vertexB)){
                this.edges[vertexA].push(vertexB)
                this.edges[vertexB].push(vertexA)
            }
        }
    }
    // 打印邻接表
    toString(){
        return this.vertexes
            .map((vertex)=> vertex + ' -> ' + this.edges[vertex].join(','))
            .join('\n')
    }

    // 初始化所有顶点为为未探索状态（white）
    initColor(){
        return this.vertexes.reduce((total,v) => ({...total,[v]:Graph.WHITE}),{})
    }

    /**
     * 广度优先搜索
     * @param vertex 起始顶点
     * @param callback 回调函数
     * @constructor
     */
    BFS(vertex,callback){
        // 初始化顶点颜色
        let color = this.initColor();
        let queue = [];
        queue.push(vertex);
        while (queue.length){
            let currentVertex = queue.shift()
            // 遍历于当前节点相邻的节点,如果节点为未探索，加入队列标记为已发现(gray)
            this.edges[currentVertex].forEach(v => {
                if(color[v] === Graph.WHITE){
                    queue.push(v);
                    color[v] = Graph.GREY
                }
            })
            color[currentVertex] = Graph.BLACK
            callback && callback(currentVertex)
        }
    }

    /**
     * BFS数组
     * @param vertex 顶点
     * @constructor
     */
    BFS2Array(vertex){
        let BEFArray = []
        this.BFS(vertex,v=> BEFArray = [...BEFArray,v])
        return BEFArray
    }

    /**
     * 深度优先搜索
     * @param vertex 顶点
     * @param callback
     * @constructor
     */
    // DFS(vertex,callback){
    //     let color = this.initColor()
    //     let stack = []
    //     stack.push(vertex)
    //
    //     while (stack.length){
    //         let currentVertex = stack.pop()
    //         this.edges[currentVertex].forEach(v => {
    //             if(color[v] === Graph.WHITE){
    //                 stack.push(v)
    //                 color[v] = Graph.GREY
    //             }
    //         })
    //
    //         color[currentVertex] = Graph.BLACK
    //         callback&&callback(currentVertex)
    //     }
    // }
    DFS(vertex,callback){
       let color = this.initColor()
        this.DFSFun(vertex,color,callback)
    }
    DFSFun(vertex,color,callback){
        color[vertex] = Graph.GREY
        callback&&callback(vertex)
        this.edges[vertex].forEach(v => {
            if(color[v] === Graph.WHITE){
                this.DFSFun(v,color,callback)
            }
        })
        color[vertex] = Graph.BLACK
    }
    DFS2Array(vertex){
        let DFSArray = []
        this.DFS(vertex,v => DFSArray = [...DFSArray,v])
        return DFSArray
    }
}

const graph = new Graph();
const vertices = ['A','B','C','D','E','F','G','H','I'];
vertices.forEach((i) => graph.addVertex(i));
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');


/*
         A
     /   |   \
    B    C  -  D
   /  \   \  /  \
  E   F    G     H
  |
  I
         B
     /   |   \
    A    E    F
   /  \   \
  C  - D    I
  |  /  \
  G      H

 */

console.log(graph.toString())
/*
A -> B,C,D
B -> A,E,F
C -> A,D,G
D -> A,C,G,H
E -> B,I
F -> B
G -> C,D
H -> D
I -> E
 */
console.log(graph.BFS2Array('A').join(',')) // A,B,C,D,E,F,G,H,I
console.log(graph.BFS2Array('B').join(',')) // B,A,E,F,C,D,I,G,H
console.log(graph.DFS2Array('A').join(',')) // A,B,E,I,F,C,D,G,H
console.log(graph.DFS2Array('B').join(',')) // B,A,C,D,G,H,E,I,F

