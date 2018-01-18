/*
对生成的格子进行初始化

与棋盘坐标保持一致
 */

function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;

  this.previousPosition = null;
  this.mergedFrom       = null;
}
//保存当前位置
Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};
//更新位置坐标
Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};
//获得坐标，与棋盘坐标保持一致
Tile.prototype.clone = function() {
  newTile = new Tile({ x: this.x, y: this.y }, this.value);
  return newTile;
}
