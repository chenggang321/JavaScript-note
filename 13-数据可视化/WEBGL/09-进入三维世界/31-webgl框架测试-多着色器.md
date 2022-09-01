# 基于webgl 的轻量级架构
场景Scene：包含所有的三维对象，并负责绘图
三维对象Obj3D：包含几何体Geo和材质Mat，对两者进行统一管理
几何体Geo：对应attribute 顶点数据
材质Mat：包含程序对象，对应uniform 变量