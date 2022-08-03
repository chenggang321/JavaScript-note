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
export default class Touch2 {
  /**
   * @param {Element} el
   * @param {Object} param1
   */
  constructor(el, {
    triggerTapMaxTime = 250, // triggerTapMaxTime时间内, 只发生一次touchstart算作tap
    triggerTapMaxSize = 5, // 触发tap事件的最大尺寸范围
    triggerPressTime = 500, // 触发press所需时间
  } = {}) {
    this.el = el;
    this.triggerTapMaxTime = triggerTapMaxTime;
    this.triggerTapMaxSize = triggerTapMaxSize;
    this.triggerPressTime = triggerPressTime;
    this.startTime = null;
    this.lastTime = null;
    this.startScale = 1;
    this.activeScale = 1;
    this.startAngle = 0;
    this.activeAngle = 0;
    this.isPreventSwipe = false;
    this.preventSwipeTimeout = null;
    // this.panThreshold = 10;
    // 起始向量(2指间)
    this.startV = {
      x: null,
      y: null
    };

    // 当前向量(2指间)
    this.activeV = {
      x: null,
      y: null
    };

    // 接触点坐标, 相对屏幕左上角, touchstart的时候更新为activePoint的值
    this.startPoint = [{
      x: null,
      y: null
    }, {
      x: null,
      y: null
    }];

    // 当前接触点坐标, 相对屏幕左上角
    this.activePoint = [{
      x: null,
      y: null
    }, {
      x: null,
      y: null
    }];

    // 判断doubleTap所需临时变量
    this.preTapPonit = {
      x: null,
      y: null
    };

    this.isDoubleTap = false;
    this.tapTimeout = null;
    this.singleTapTimeout = null;
    this.doubleTapTimeout = null;
    this.pressTimeout = null;
    this.swipeTimeout = null;
    this.rotateTimeout = null;
    this.pinchTimeout = null;
    this.type = '';

    this._rotateHandle = () => {};
    this._pinchHandle = () => {};
    this._singleTapHandle = () => {};
    this._doubleTapHandle = () => {};
    this._pressHandle = () => {};
    this._panHandle = () => {};
    this._swipeHandle = () => {};
    this.touchStart = () => {};
    this.touchMove = () => {};
    this.touchEnd = () => {};

    // 替换事件中的this(元素)为class
    this._touchstart = this.touchStartHandle.bind(this);
    this._touchmove = this.touchMoveHandle.bind(this);
    this._touchend = this.touchEndHandle.bind(this);
    this._touchcancel = this.touchEndHandle.bind(this);

    // 绑定事件
    el.addEventListener('touchstart', this._touchstart);
    el.addEventListener('touchmove', this._touchmove);
    el.addEventListener('touchend', this._touchend);
    el.addEventListener('touchcancel', this._touchcancel);
  }

  /**
   * start阶段, 主要记录初始位置信息
   * @param {Event} e
   */
  touchStartHandle(e) {
    if (!e.touches) return;

    const points = e.touches;
    const pointCount = points.length;

    // 当2指同时在屏幕上, 取消press
    if(1 < pointCount) this._cancelPress();

    this.lastTime = this.startTime;
    this.startTime = Date.now();
    this.interval = this.startTime - (this.lastTime || this.startTime);

    // [!tap] 为tap系列做准备
    this.activePoint[0].x = points[0].pageX;
    this.activePoint[0].y = points[0].pageY;

    // [!doubleTap]
    // 2次点击有时间间隔 | 间隔时间在一次tap的时间判定范围内 | 点击范围在tap类事件尺寸范围内(默认10 * 10)
    if (null != this.preTapPonit.x) {
      if (
        this.interval > 0 &&
        this.interval <= this.triggerTapMaxTime &&
        Math.abs(this.activePoint[0].x - this.preTapPonit.x) < this.triggerTapMaxSize &&
        Math.abs(this.activePoint[0].y - this.preTapPonit.y) < this.triggerTapMaxSize) {

        this.isDoubleTap = true;
        this._cancelSingleTap();
      }
    }

    // [!doubleTap] 存储上一次点击, 判断双击用
    this.preTapPonit.x = this.activePoint[0].x;
    this.preTapPonit.y = this.activePoint[0].y;

    // [!press] touchstart时间超过triggerPressTime,且期间没有触发touchmove和touchstart, 那么触发press
    this.pressTimeout = setTimeout(() => {
      this.type = 'press';
      this._pressHandle({
        type: 'press'
      }, e);
    }, this.triggerPressTime);

    // [!tap]设置当前点为起始点
    this.startPoint[0].x = this.activePoint[0].x;
    this.startPoint[0].y = this.activePoint[0].y;
    // 接触点超过1个
    if (1 < pointCount) {
      this._cancelSingleTap();
      this._cancelDoubleTap();

      // 起始向量
      this.startV = {
        x: points[1].pageX - points[0].pageX,
        y: points[1].pageY - points[0].pageY
      };

      // 初始向量模
      this.startVModule = this._getVLength(this.startV);

      // // 获取之前操作值作为起始值
      // this.startScale = this.activeScale;
      // this.startAngle = this.activeAngle;
    }
  }

  /**
   * touchmove事件触发
   * @param {Event} e
   */
  touchMoveHandle(e) {

    const points = e.touches;
    const pointCount = points.length;

    // 一旦发生touchmove取消双击判定
    this.isDoubleTap = false;

    if (1 < pointCount) {

      this.activePoint[1].x = points[1].pageX;
      this.activePoint[1].y = points[1].pageY;

      // [!rotate][!pinch], 当前2指坐标构成的向量
      this.activeV = {
        x: points[1].pageX - points[0].pageX,

        y: points[1].pageY - points[0].pageY
      };

      // [!pinch], 当前向量模
      this.activeVModule = this._getVLength(this.activeV);

      // [!pinch], 当前缩放比例
      this.activeScale = this.activeVModule / this.startVModule;

      // [!rotate], 本次touchmove和上次touchmove的夹角
      this.activeAngle = this._getAngle(this.activeV, this.startV);

      // [!rotate], 重置, 起始向量为当前向量, 这样activeAngle是每次touchmove的夹角
      this.startV = this.activeV;

      // [!pinch], 重置
      this.startVModule = this.activeVModule;

      this._rotateHandle({
        type: 'rotate',
        angle: this.activeAngle
      }, e);

      this._pinchHandle({
        type: 'pinch',
        scale: this.activeScale
      }, e);

      this.isPreventSwipe = true;
      // 300秒内发生移动, 阻止swipe
      this.preventSwipeTimeout = setTimeout(() => {
        this.isPreventSwipe = false;
      }, 300);

    } else {
      // [!pan]
      let deltaX = 0;
      let deltaY = 0;

      if (null !== this.startPoint[0].x) {
        deltaX = points[0].pageX - this.activePoint[0].x;
        deltaY = points[0].pageY - this.activePoint[0].y;

      } else {
        // 2指移开一个1指, 那么重新给起始点赋值,
        // 防止一直进行上面null !== this.startPoint[0].x的逻辑
        // 这样移开一个手指后, 另一个手指也可以继续拖拽移动
        this.startPoint[0].x = this.activePoint[0].x;
        this.startPoint[0].y = this.activePoint[0].y;
      }

      //
      const touchMoveX = Math.abs(points[0].pageX - this.startPoint[0].x);
      const touchMoveY = Math.abs(points[0].pageY - this.startPoint[0].y);

      // [pan]判定触发pan
      if (this.triggerTapMaxSize < Math.max(touchMoveX, touchMoveY)) {
        this._panHandle({
          type: 'pan',
          deltaX,
          deltaY
        }, e);
      }
    }

    // 重置当前起点(让pan每次返回touchmove发生一次所移动的距离)
    this.activePoint[0].x = points[0].pageX;
    this.activePoint[0].y = points[0].pageY;

    // [!long-tap] 发生移动, 取消long-tap
    this._cancelPress();
    if (1 < pointCount) {
      e.preventDefault();
    }
  }

  touchEndHandle(e) {
    // 手指离开取消press
    this._cancelPress();

    // 触发end的时候, 屏幕上剩余的接触点个数
    const remainTouchsCount = e.touches.length;
    const points = e.changedTouches;
    const pointCount = points.length;

    // [!swipe], 用来计算拖拽事件
    this.lastTime = Date.now();

    // [!tap]
    const deltaX = points[0].pageX - this.startPoint[0].x;
    const deltaY = points[0].pageY - this.startPoint[0].y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // [!tap | !doubleTap] tap识别范围内, 触发tap
    if (this.triggerTapMaxSize > absDeltaX && this.triggerTapMaxSize > absDeltaY) {
      this.tapTimeout = setTimeout(() => {
        // [!singleTap !doubleTap] 如果不是双击, 那么让单击事件this.triggerTapMaxTimems后执行
        if (!this.isDoubleTap) {
          this.singleTapTimeout = setTimeout(() => {
            this._singleTapHandle({
              type: 'tap'
            }, e);
          }, this.triggerTapMaxTime);
        } else {
          // [!doubleTap] 如果当前是双击, 那么取消单击事件
          clearTimeout(this.singleTapTimeout);
          this._doubleTapHandle({
            type: 'double-tap'
          }, e);
          this.isDoubleTap = false;
        }
      }, 0);
    } else {
      // [!swiper]
      // 拖拽时间
      const holdTime = this.lastTime - this.startTime;
      const velocity = Math.max(absDeltaX, absDeltaY) / holdTime;
      const velocityX = absDeltaX / holdTime;
      const velocityY = absDeltaY / holdTime;

      if (0.3 < velocity && 200 > Date.now() - this.startTime) {
        let direction = 'none';
        if (absDeltaX > absDeltaY) {
          direction = 0 < Math.sign(deltaX) ? 'right' : 'left';
        } else {
          direction = 0 < Math.sign(deltaY) ? 'down' : 'up';
        }
        if (0 == remainTouchsCount && !this.isPreventSwipe) {
          // [!swiper]
          this.swipeTimeout = setTimeout(() => {
            this._swipeHandle({
              type: 'swipe',
              deltaX,
              deltaY,
              direction,
              velocity,
              velocityX,
              velocityY,
              holdTime
            }, e);
          }, 0);
        }
      }
    }

    // [!press] 手指离开屏幕, 取消press
    this._cancelPress();
    // [!pan] 用来当发生pinch/rotate时, 避免同时发生pan
    this.startPoint[0] = {
      x: null,
      y: null
    };
    this.startPoint[1] = {
      x: null,
      y: null
    };
  }

  touchCancelHandle(e) {
    this._cancelAll();
  }

  /**
   * "-"格式转成驼峰格式
   * @param {String} string
   */
  _camelize(string) {
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
    if ('tap' === eventName) {
      this._singleTapHandle = handle;
    } else {
      this[`_${this._camelize(eventName)}Handle`] = handle;
    }
  }

  /**
   * 解除绑定事件
   * @param {String} 事件名
   * @param {Function} handle
   */
  off(eventName, handle) {
    this[`_${eventName}Handle`] = () => {};
  }

  destory() {
    this.el.removeEventListener('touchstart', this._touchstart);
    this.el.removeEventListener('touchmove', this._touchmove);
    this.el.removeEventListener('touchend', this._touchend);
    this.el.removeEventListener('touchcancel', this._touchcancel);
    this._cancelAll();
  }

  _cancelSingleTap() {
    clearTimeout(this.singleTapTimeout);
    this.singleTapTimeout = null;
  }

  _cancelPress() {
    clearTimeout(this.pressTimeout);
    this.pressTimeout = null;
  }

  _cancelDoubleTap() {
    clearTimeout(this.doubleTapTimeout);
    this.doubleTapTimeout = null;
  }

  _cancelSwipe() {
    clearTimeout(this.swipeTimeout);
    this.swipeTimeout = null;
  }

  _cancelPinch() {
    clearTimeout(this.pinchTimeout);
    this.pinchTimeout = null;
  }

  _cancelAll() {
    this._cancelSingleTap();
    this._cancelDoubleTap();
    this._cancelSwipe();
    this._cancelPinch();
    this._cancelPress();
  }

  /**
   * 获取向量长度
   * @param {Object} 向量
   */
  _getVLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  /**
   * 点积
   * @param {Object} v1
   * @param {Object} v2
   */
  _getDotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  /**
   * 向量夹角(弧度)
   * @param {Object} v1
   * @param {Object} v2
   */
  _getRadian(v1, v2) {
    var mr = this._getVLength(v1) * this._getVLength(v2);
    if (mr === 0) return 0;
    var r = this._getDotProduct(v1, v2) / mr;
    if (r > 1) r = 1;
    return Math.acos(r);
  }

  /**
   * 求旋转方向
   * 顺时针/逆时针
   */
  _getCross(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
  }

  /**
   * 向量夹角(角度)
   * @param {Object} v1
   * @param {Object} v2
   */
  _getAngle(v1, v2) {
    var angle = this._getRadian(v1, v2);
    if (this._getCross(v1, v2) > 0) {
      angle *= -1;
    }
    return angle * 180 / Math.PI;
  }
}
