/**
 * https://segmentfault.com/a/1190000010511484#articleHeader0
 * https://segmentfault.com/a/1190000007448808#articleHeader1
 * rotate 旋转
 * pinch 捏合
 * tap 单机
 * doubleTap 双击
 * press 按压
 * pan 拖拽
 * swipe 快速划过
 * touchStart
 * touchMove
 * touchEnd
 */
import {
  getVLength,
  getDotProduct,
  getRadian,
  getCross,
  getAngle,
  getCenter,
  getDirection
} from './vector.js'

// *** 注意: touch-action未兼容
import TapRecognizer from './recognitions/Tap.js';
import PressRecognizer from './recognitions/Press.js';
import PanRecognizer from './recognitions/Pan.js';
import SwipeRecognizer from './recognitions/Swipe.js';
import PinchRecognizer from './recognitions/Pinch.js';
import RotateRecognizer from './recognitions/Rotate.js';


export default class Touch2 {
  /**
   * @param {Element} el
   * @param {Object} param1
   */
  constructor(el, {
    isPreventDefault = false,
    isStopPropagation = false
  } = {}) {
    this.el = el;
    this.$fingerInput = {}; // 手势产生的数据
    this.isPreventDefault = isPreventDefault;
    this.isStopPropagation = isStopPropagation;

    // timeout

    this.rotateType = 'none';

    // Recognizers
    this.panRecognizer = new PanRecognizer();
    this.pressRecognizer = new PressRecognizer();
    this.tapRecognizer = new TapRecognizer();
    this.swipeRecognizer = new SwipeRecognizer();
    this.pinchRecognizer = new PinchRecognizer();
    this.rotateRecognizer = new RotateRecognizer();

    // disabled
    this.isPanDisabled = false;
    this.isSwipeDisabled = false;

    // 各个手势对应的handle集合
    this.handleMap = {};

    // 替换事件中的this(元素)为class
    this.touchstart = this.touchStartHandle.bind(this);
    this.touchmove = this.touchMoveHandle.bind(this);
    this.touchend = this.touchEndHandle.bind(this);
    this.touchcancel = this.touchCancelHandle.bind(this);

    // 绑定事件
    el.addEventListener('touchstart', this.touchstart);
    el.addEventListener('touchmove', this.touchmove);
    el.addEventListener('touchend', this.touchend);
    el.addEventListener('touchcancel', this.touchcancel);


    // el.addEventListener('mousedown', this.touchstart);
    // el.addEventListener('mouseup', this.touchend);
  }

  setConfig({
              isPreventDefault = false,
              isStopPropagation = false
            } = {}) {
    this.isPreventDefault = isPreventDefault;
    this.isStopPropagation = isStopPropagation;
  };

  /**
   * start阶段, 主要记录初始位置信息
   * @param {Event} e
   */
  touchStartHandle(e) {
    if (this.isPreventDefault) e.preventDefault();
    if (this.isStopPropagation) e.stopPropagation();
    const points = e.touches;
    const pointCount = points.length;
    // 整合手势数据
    this.$fingerInput.startPoints = (points); // 存储起始点
    this.$fingerInput.timestamp = Date.now();
    this.$fingerInput.startTimestamp = this.$fingerInput.timestamp;
    this.$fingerInput.points = (points);
    this.$fingerInput.pointCount = pointCount;
    this.$fingerInput.prevPoints = undefined;
    this.$fingerInput.nativeEvent = e;

    // 单/多点触碰
    if (1 === this.$fingerInput.pointCount) {
      // 单点

      // 解除pan和swipe的禁用
      this.isPanDisabled = false;
      this.isSwipeDisabled = false;

      // 识别[press]
      this.pressRecognizer.start(this.$fingerInput).then(type => {
        this.emit(type, {
          type,
          nativeEvent: e
        }, e);
      });
    } else {
      // 多点
      this.$fingerInput.startV = {
        x: this.$fingerInput.startPoints[1].pageX - this.$fingerInput.startPoints[0].pageX,
        y: this.$fingerInput.startPoints[1].pageY - this.$fingerInput.startPoints[0].pageY
      }; // 起始向量
      this.$fingerInput.startVModule = getVLength(this.$fingerInput.startV); // 起始向量模
      this.$fingerInput.v = this.$fingerInput.startV;
      this.$fingerInput.vModule = this.$fingerInput.startVModule;
      this.$fingerInput.prevV = undefined; // 上一次触碰产生的向量
      this.$fingerInput.prevVModule = undefined; // 上一次触碰产生的向量模

      // 每次单点触摸开始, 解除pan和swipe的禁用
      this.isPanDisabled = true;
      this.isSwipeDisabled = true;
    }
  }

  /**
   * touchmove事件触发
   * @param {Event} e
   */
  touchMoveHandle(e) {
    if (this.isPreventDefault) e.preventDefault();
    if (this.isStopPropagation) e.stopPropagation();
    const points = e.touches;
    const pointCount = points.length;

    // 整合手势数据
    this.$fingerInput.timestamp = Date.now();
    this.$fingerInput.prevPoints = (this.$fingerInput.points);
    this.$fingerInput.points = (points); // 当前点
    this.$fingerInput.pointCount = pointCount;
    this.$fingerInput.offsetX = Math.ceil(points[0].pageX - this.$fingerInput.startPoints[0].pageX); // 与起始点的偏移
    this.$fingerInput.offsetY = Math.ceil(points[0].pageY - this.$fingerInput.startPoints[0].pageY);
    this.$fingerInput.absOffsetX = Math.abs(this.$fingerInput.offsetX);
    this.$fingerInput.absOffsetY = Math.abs(this.$fingerInput.offsetY);
    this.$fingerInput.deltaX = Math.ceil(points[0].pageX - this.$fingerInput.prevPoints[0].pageX); // 与上一点的偏移
    this.$fingerInput.deltaY = Math.ceil(points[0].pageY - this.$fingerInput.prevPoints[0].pageY);
    this.$fingerInput.absDeltaX = Math.abs(this.$fingerInput.deltaX);
    this.$fingerInput.absDeltaY = Math.abs(this.$fingerInput.deltaY);
    this.$fingerInput.nativeEvent = e;

    if (1 === pointCount) {
      // ========== 单点 ==========
      // 识别[panstart | panmove]
      if (!this.isPanDisabled) {
        if (this.panRecognizer.move(this.$fingerInput)) {
          this.emit(this.panRecognizer.type, this.panRecognizer.computedData(e), e);
        }
      }
    } else {
      // ========== 多点 ==========
      this.isPanDisabled = true;
      this.isSwipeDisabled = true;

      // 存储上次触碰产生的向量
      this.$fingerInput.prevV = this.$fingerInput.v;
      this.$fingerInput.prevVModule = this.$fingerInput.vModule;
      // 当前向量
      this.$fingerInput.v = {
        x: points[1].pageX - points[0].pageX,
        y: points[1].pageY - points[0].pageY
      };
      this.$fingerInput.vModule = getVLength(this.$fingerInput.v); // 当前向量摸

      // 识别[pinch : pinchstart | pinchmove]
      if (this.pinchRecognizer.move(this.$fingerInput)) {
        this.emit(this.pinchRecognizer.type, this.pinchRecognizer.computedData());
      }


      // 识别[rotate: rotatestart | rotatemove]
      if (this.rotateRecognizer.move(this.$fingerInput)) {
        this.emit(this.rotateRecognizer.type, this.rotateRecognizer.computedData());
      }

    }

    // 如果移动过大, 取消press事件
    this.pressRecognizer.move(this.$fingerInput);
  }

  touchEndHandle(e) {
    if (this.isPreventDefault) e.preventDefault();
    if (this.isStopPropagation) e.stopPropagation();
    const endPoints = e.changedTouches;
    const now = Date.now();

    // this.$fingerInput.points = [];

    this.$fingerInput.pointCount = 0;
    this.$fingerInput.prevPoints = endPoints;
    this.$fingerInput.endPoints = endPoints;
    this.$fingerInput.endPointCount = endPoints.length;
    this.$fingerInput.offsetX = this.$fingerInput.endPoints[0].pageX - this.$fingerInput.startPoints[0].pageX; // 距离起点的偏移
    this.$fingerInput.offsetY = this.$fingerInput.endPoints[0].pageY - this.$fingerInput.startPoints[0].pageY;
    this.$fingerInput.absOffsetX = Math.abs(this.$fingerInput.offsetX);
    this.$fingerInput.absOffsetY = Math.abs(this.$fingerInput.offsetY);
    this.$fingerInput.offsetTime = now - this.$fingerInput.startTimestamp;
    this.$fingerInput.timestamp = now;
    this.$fingerInput.velocityX = this.$fingerInput.offsetX / this.$fingerInput.offsetTime;
    this.$fingerInput.velocityY = this.$fingerInput.offsetY / this.$fingerInput.offsetTime;
    this.$fingerInput.absVelocityX = Math.abs(this.$fingerInput.velocityX);
    this.$fingerInput.absVelocityY = Math.abs(this.$fingerInput.velocityY);
    this.$fingerInput.nativeEvent = e;

    // 当有手指移开的时候, 解除swipe/pan禁用
    setTimeout(() => {
      this.isPanDisabled = false;
      this.isSwipeDisabled = false;
    }, 100);

    // 识别[tap|doubeltap]
    this.tapRecognizer.end(this.$fingerInput, !!this.handleMap.doubletap).then(() => {
      this.emit(this.tapRecognizer.type, this.tapRecognizer.computedData());
    });


    // 识别[pressup]
    if (this.pressRecognizer.end(this.$fingerInput)) {
      this.emit(this.pressRecognizer.type, this.pressRecognizer.computedData());
    };

    // 识别[panend], 该处识别要放在swipe之前
    if (this.panRecognizer.end(this.$fingerInput)) {
      this.emit(this.panRecognizer.type, this.panRecognizer.computedData());
    }

    // 识别[swipe: swipeleft | swiperight | swipeup | swipedown]
    if (!this.isSwipeDisabled) {
      if (this.swipeRecognizer.end(this.$fingerInput)) {
        this.emit(this.swipeRecognizer.type, this.swipeRecognizer.computedData());
      }
    }

    // 多点
    // 识别[pinch : pinchend]
    this.pinchRecognizer.end(this.$fingerInput);
    this.emit(this.pinchRecognizer.type, this.pinchRecognizer.computedData());

    // 识别[rotate : rotateend]
    this.rotateRecognizer.end(this.$fingerInput);
    this.emit(this.rotateRecognizer.type, this.rotateRecognizer.computedData());
  }

  touchCancelHandle(e) {
    // log('cancel')
  }

  /**
   * "-"格式转成驼峰格式
   * @param {String} string
   */
  camelize(string) {
    var camelizeRE = /-(\w)/g;
    return string.replace(camelizeRE, word => {
      return word.toLocaleUpperCase().slice(1)
    });
  }

  /**
   * 绑定事件
   * @param {String} 事件名
   * @param {Function} handle
   */
  on(eventName, handle) {
    this.handleMap[this.camelize(eventName)] = handle;
    // this[`${this.camelize(eventName)}Handle`] = handle;
  }

  /**
   * 解除绑定事件
   * @param {String} 事件名
   * @param {Function} handle
   */
  off(eventName, handle) {
    this[`${eventName}Handle`] = () => {};
  }

  destory() {
    this.el.removeEventListener('touchstart', this.touchstart);
    this.el.removeEventListener('touchmove', this.touchmove);
    this.el.removeEventListener('touchend', this.touchend);
    this.el.removeEventListener('touchcancel', this.touchcancel);
  }

  cancelAll() {}

  emit(eventName, payload) {
    if (undefined !== this.handleMap[eventName]) {
      this.handleMap[eventName](payload, payload.nativeEvent);
    }

    if (undefined !== payload.belong && undefined !== this.handleMap[payload.belong]) {
      payload.type = payload.belong;
      delete payload.belong;
      this.handleMap[payload.type](payload, payload.nativeEvent);
    }
  }
}
