//canvas instannce constructor
function Canvas(canvas){
  this.canvas = canvas;
  this.height = canvas.height;
  this.width = canvas.width;
  this.shapesArr = [];
  this.messageArr = [];
  this.pointsArray = [];
  this.isOnPolygon = false;
  this.pointsLimit = 0;
  this.imx;
  this.imy;
  this.fmx;
  this.fmy;
  var self = this;
  this.ctx = canvas.getContext('2d');
  // mousedown event listener
  canvas.addEventListener('mousedown', function(event){
    console.log('mousedown');
    self.imx = event.clientX;
    self.imy = event.clientY;
    if(self.allowToDraw) {
      self.pointsArray.push({'x' : event.clientX, 'y' : event.clientY});
      if(self.pointsArray.length === self.pointsLimit){
        self.shapesArr.push(new Polygon(self.pointsArray, getNewColor()));
        self.pointsArray = [];
        self.allowToDraw = false;
        self.ClearAndDraw();
      }
    } else {
      if(self.shapesArr.length && !self.isOnPolygon){
        let i=0;
        self.shapesArr.forEach(function(triangle){
          if(triangle.checkPos(self.ctx, self.imx, self.imy)){
            self.isOnPolygon = true;
            self.selected = triangle;
            self.selectedPos = i;
          }
          i++;
        });
        if(self.isOnPolygon){
          let polyShape = self.shapesArr[self.selectedPos];
          self.shapesArr.splice(self.selectedPos, 1);
          self.shapesArr.push(polyShape);
          self.selectedPos = self.shapesArr.length - 1;
        }
      }
    }
  });
  //mouseup event listener
  canvas.addEventListener('mousemove', function(event){
    self.fmx = event.clientX;
    self.fmy = event.clientY;
    if(self.isOnPolygon){
      let xdiff = self.fmx-self.imx;
      let ydiff = self.fmy-self.imy;
      self.selected.sides.forEach(function(side){
        side.x = side.x + (xdiff ? xdiff : -xdiff);
        side.y = side.y + (ydiff ? ydiff : -ydiff);
      });
      self.imx = self.fmx;
      self.imy = self.fmy;
      self.ClearAndDraw();
    }
  });
  canvas.addEventListener('mouseup', function(event){
    // self.fmx = event.clientX;
    // self.fmy = event.clientY;
    if(self.isOnPolygon){
      self.selected = null;
      self.isOnPolygon = false;
      // self.ClearAndDraw();
    }
  });
  //double-click event listener
  canvas.addEventListener('dblclick', function(event){
    console.log('dblclick');
    self.shapesArr.splice(self.selectedPos, 1);
    self.ClearAndDraw();
  });


  document.getElementById("clear").addEventListener("click", function(){
    self.shapesArr=[];
    self.ClearAndDraw();
  });
};
Canvas.prototype.ClearAndDraw = function(){
  this.clear();
  this.draw();
};
//function to draw triangle from array
Canvas.prototype.draw = function(){
  let self = this;
  this.shapesArr.forEach(function(triangle){
    triangle.drawPolygon(self.ctx);
  });
};
//function to clear canvas
Canvas.prototype.clear = function(){
  this.ctx.clearRect(0, 0, this.width, this.height);
};
Canvas.prototype.initPolygon = function(length){
  if(!length) return false;
  var self = this;
  self.allowToDraw = true;
  this.pointsLimit = length;
  this.ctx.fillText("Please Select points on the canvas", this.width/2-20, 50);
  setTimeout(
    function(){
      self.ctx.fillText("", this.width/2-20, 50);
    }
  , 2000);
};
