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
    console.log('mousedown event called');
    self.imx = event.clientX;
    self.imy = event.clientY;
    if(self.shapesArr.length){
      let i=0;
      self.shapesArr.forEach(function(triangle){
        if(triangle.checkPos(self.ctx, self.imx, self.imy)){
          self.isOnPolygon = true;
          self.selected = triangle;
          self.selectedPos = i;
        }
        i++;
      });
    } else {
      self.isOnPolygon = false;
    }
    event.preventDefault();
  });
  //mouseup event listener
  canvas.addEventListener('mouseup', function(event){
    console.log('mouseup event called');
    self.fmx = event.clientX;
    self.fmy = event.clientY;
    if(self.isOnPolygon){
      let tri = self.shapesArr[self.selectedPos];
      self.shapesArr.splice(self.selectedPos, 1);
      let xdiff = self.fmx-self.imx;
      let ydiff = self.fmy-self.imy;
      tri.sides.forEach(function(side){
        side.x = side.x + (xdiff ? xdiff : -xdiff);
        side.y = side.y + (ydiff ? ydiff : -ydiff);
      });
      self.shapesArr.push(new Polygon(tri.sides, tri.color));
      self.isOnPolygon=false;
      self.clear();
    }
    event.preventDefault();
  });
  //double-click event listener
  canvas.addEventListener('dblclick', function(event){
    self.shapesArr.splice(self.selectedPos, 1);
    self.clear();
    event.preventDefault();
  });
  setInterval(function() {
    self.draw();
  }, 10);

  // click function
  canvas.addEventListener('click', function(event) {
    if(!self.allowToDraw) return false;
    self.pointsArray.push({'x' : event.clientX, 'y' : event.clientY});
    if(self.pointsArray.length === self.pointsLimit){
      self.shapesArr.push(new Polygon(self.pointsArray, getNewColor()));
      self.pointsArray = [];
      self.allowToDraw = false;
    }
    console.log('click event called');
  }, false);

  document.getElementById("clear").addEventListener("click", function(){
    self.shapesArr=[];
    self.clear();
  });
};
//function to draw triangle from array
Canvas.prototype.draw = function(){
  // if(!this.isOnTriangle){
    let self = this;
    this.shapesArr.forEach(function(triangle){
      triangle.drawPolygon(self.ctx);
    });
  // }
};
//function to clear canvas
Canvas.prototype.clear = function(){
  this.ctx.clearRect(0, 0, this.width, this.height);
};
Canvas.prototype.initPolygon = function(length){
  if(!length) return false;
  console.log('initPolygon called');
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
