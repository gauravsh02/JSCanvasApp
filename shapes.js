function Triangle (ix, iy, fx, fy, rgb){
  var ydiff = Math.abs(fx-iy);
  var xc = Math.floor(Math.abs(ydiff/Math.tan(30))/2);
  this.x1 = ix || 1;
  this.y1 = iy || 1;
  this.x2 = fx+xc || 2;
  this.y2 = fy || 2;
  this.x3 = fx-xc || 0;
  this.y3 = fy || 1;
  this.rgb = rgb || 'rgb(200, 200, 200)';
};
//function to draw triangle
Triangle.prototype.drawTriangles = function(ctx){
  ctx.beginPath();
  ctx.moveTo(this.x1, this.y1);
  ctx.lineTo(this.x2, this.y2);
  ctx.lineTo(this.x3, this.y3);
  ctx.lineTo(this.x1, this.y1);
  ctx.lineWidth=2;
  ctx.stroke();
  ctx.fillStyle = this.rgb;
  ctx.fill();
};
/*
function to check position of click if it lies inside triangle
it compares the area of the triangle with total area with
formed by taking (x, y) as third point and other two point from triangle
*/
Triangle.prototype.checkPos = function(x, y){
  let ar1 = getArea(this.x1, this.y1, this.x2, this.y2, x, y);
  let ar2 = getArea(this.x1, this.y1, x, y, this.x3,this. y3);
  let ar3 = getArea(x, y, this.x2, this.y2, this.x3, this.y3);
  let area = getArea(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  return area === ar1+ar2+ar3;
};
//retur area of triangle
function getArea(x1, y1, x2, y2, x3, y3){
  return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
};
//______________________________________

//class Polygon so there can be shapes with different nimber of sides
function Polygon(sides, rgb){
  this.sides = sides;
  this.sides = rgb || 'rgb(200, 200, 200)';
}
//Draw Polygon
Polygon.prototype.draw = function(ctx){
  let startPosX, startPosY;
  ctx.beginPath();
  this.sides.forEach(function(s, i){
    if(!i){
      startPosX = s.x;
      startPosY = s.y;
      ctx.moveTo(s.x, s.y);
    } else {
      ctx.lineTo(s.x, s.y);
    }
  });
  ctx.lineTo(startPosX, startPosY);
  ctx.lineWidth=2;
  ctx.stroke();
  ctx.fillStyle = this.rgb;
  ctx.fill();
}
