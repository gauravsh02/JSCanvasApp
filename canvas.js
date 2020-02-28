//canvas instannce constructor
function Canvas(canvas){
  this.canvas = canvas;
  this.height = canvas.height;
  this.width = canvas.width;
  this.triangleArr = [];
  this.shapesArr = [];
  this.isOnTriangle = false;
  this.imx;
  this.imy;
  this.fmx;
  this.fmy;
  var self = this;
  this.ctx = canvas.getContext('2d');
  //mousedown event listener
  canvas.addEventListener('mousedown', function(event){
    self.imx = event.clientX;
    self.imy = event.clientY;
    if(self.triangleArr.length){
      let i=0;
      self.triangleArr.forEach(function(triangle){
        if(triangle.checkPos(self.imx, self.imy)){
          self.isOnTriangle = true;
          self.selected = triangle;
          self.selectedPos = i;
        }
        i++;
      });
    } else {
      self.isOnTriangle = false;
    }
    event.preventDefault();
  });
  //mouseup event listener
  canvas.addEventListener('mouseup', function(event){
    self.fmx = event.clientX;
    self.fmy = event.clientY;
    if(self.isOnTriangle){
      let tri = self.triangleArr[self.selectedPos];
      self.triangleArr.splice(self.selectedPos, 1);
      let xdiff = self.fmx-self.imx;
      let ydiff = self.fmy-self.imy;
      tri.x1+=xdiff;
      tri.y1+=ydiff;
      tri.x2+=xdiff;
      tri.y2+=ydiff;
      tri.x3+=xdiff;
      tri.y3+=ydiff;
      self.triangleArr.push(tri);
      self.isOnTriangle=false;
      self.clear();
    } else {
      self.triangleArr.push(new Triangle(self.imx, self.imy, self.fmx, self.fmy, getNewColor()));
    }
    event.preventDefault();
  });
  //double-click event listener
  canvas.addEventListener('dblclick', function(event){
    self.triangleArr.splice(self.selectedPos, 1);
    self.clear();
    event.preventDefault();
  });
  setInterval(function() {
    self.draw();
  }, 10);
  document.getElementById("clear").addEventListener("click", cl);
  function cl(){
  self.triangleArr=[];
  self.clear();
  }
};
//function to draw triangle from array
Canvas.prototype.draw = function(){
  // if(!this.isOnTriangle){
    let self = this;
    this.triangleArr.forEach(function(triangle){
      triangle.drawTriangles(self.ctx);
    });
  // }
};
//function to clear canvas
Canvas.prototype.clear = function(){
  this.ctx.clearRect(0, 0, this.width, this.height);
};
