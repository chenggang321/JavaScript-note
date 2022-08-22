/**
 * 时间轨
 * 属性
 * target 时间轨上的目标对象
 * parent 父对象，只能是合成对象
 * start 起始时间，即时间轨的建立时间
 * timeLen 时间轨总时长
 * loop 是否循环
 * keyMap 关键帧集合，结构如下：
 * [
 *     [
 *         '对象属性1',
 *         [
 *             [时间1,属性值], //关键帧
 *             [时间2,属性值], //关键帧
 *         ]
 *     ],
 *     [
 *         '对象属性2',
 *         [
 *             [时间1,属性值], //关键帧
 *             [时间2,属性值], //关键帧
 *         ]
 *     ],
 * ]
 *
 * 方法
 * update(t) 基于当前时间更新目标对象的状态。
 * 先计算本地时间，即世界时间相对于时间轨起始时间的的时间。
 * 若时间轨循环播放，则本地时间基于时间轨长度取余。
 * 遍历关键帧集合：
 * 若本地时间小于第一个关键帧的时间，目标对象的状态等于第一个关键帧的状态
 * 若本地时间大于最后一个关键帧的时间，目标对象的状态等于最后一个关键帧的状态
 * 否则，计算本地时间在左右两个关键帧之间对应的补间状态
 */
export default class Track {
  constructor(target) {
    this.target = target;
    this.parent = null;
    this.start = 0;
    this.timeLen = 5;
    this.loop = false;
    this.keyMap = new Map();
    this.onEnd = () => { }
    this.prevTime=0
  }
  getTarget(){
    return this.target
  }
  update(t) {
    const { keyMap, timeLen, target, loop, start,prevTime } = this;
    let time = t - start;
    if (timeLen >= prevTime && timeLen < time) {
      this.onEnd()
    }
    this.prevTime=time
    if (loop) {
      time = time % timeLen;
    }
    for (const [key, fms] of keyMap) {
      const last = fms.length - 1;
      if (time < fms[0][0]) {
        target[key] = fms[0][1];
      } else if (time > fms[last][0]) {
        target[key] = fms[last][1];
      } else {
        target[key] = getValBetweenFms(time, fms, last);
      }
    }
  }
}

/**
 * 取两个关键帧之间补间状态
 * @param time 本地时间
 * @param fms 某个属性的关键帧集合
 * @param last 最后一个关键帧的索引位置
 * @returns {number}
 * 遍历所有关键帧
 * 判断当前时间在哪两个关键帧之间
 * 基于这两个关键帧的时间和状态，求点斜式
 * 基于点斜式求本地时间对应的状态
 */
function getValBetweenFms(time, fms, last) {
  for (let i = 0; i < last; i++) {
    const fm1 = fms[i];
    const fm2 = fms[i + 1];
    if (time >= fm1[0] && time <= fm2[0]) {
      const delta = {
        x: fm2[0] - fm1[0],
        y: fm2[1] - fm1[1],
      };
      const k = delta.y / delta.x;
      const b = fm1[1] - fm1[0] * k;
      return k * time + b;
    }
  }
}
