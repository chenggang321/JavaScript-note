/**
 *合成对象
 * 属性
 * parent 父对象，合成对象可以相互嵌套
 * children 子对象集合，其集合元素可以是时间轨，也可以是合成对象
 *
 * 方法：
 * add(obj) 添加子对象方法
 * update(t) 基于当前时间更新子对象状态的方法
 */
export default class Compose {
  constructor() {
    this.parent = null;
    this.children = new Set();
  }
  add(obj) {
    obj.parent = this;
    this.children.add(obj);
  }
  update(t) {
    this.children.forEach((ele) => {
      ele.update(t);
    });
  }
  // 基于时间轨的目标对象删除时间轨
  deleteByTarget(targrt) {
    const { children } = this
    for (let child of children) {
      if (child.target === targrt) {
        children.delete(child)
        break
      }
    }
  }
}
