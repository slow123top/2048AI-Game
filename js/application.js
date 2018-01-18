animationDelay = 200;
minSearchTime = 100;//算法执行时间

//调用游戏控制函数
window.requestAnimationFrame(function () {
  window.manager = new GameManager(4, KeyboardInputManager, HTMLActuator);
});
