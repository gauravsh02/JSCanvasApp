//class Polygon so there can be shapes with different nimber of sides
function Polygon(sides, rgb){
  this.sides = sides;
  this.color = rgb || 'rgb(200, 200, 200)';
}
//Draw Polygon
Polygon.prototype.drawPolygon = function(ctx){
  let newPath = new Path2D();
  newPath.moveTo(this.sides[0].x, this.sides[0].y);
  ctx.beginPath();
  ctx.moveTo(this.sides[0].x, this.sides[0].y);
  this.sides.forEach(function(s, i){
    ctx.lineTo(s.x, s.y);
    newPath.lineTo(s.x, s.y);
  });
  ctx.lineTo(this.sides[0].x, this.sides[0].y);
  ctx.closePath();
  ctx.lineWidth=2;
  ctx.stroke();
  ctx.fillStyle = this.color;
  ctx.fill();
  newPath.closePath();
  this.polygonPath = newPath;
}
Polygon.prototype.checkPos = function(ctx, x, y){
  return ctx.isPointInPath(this.polygonPath, x, y);
};
