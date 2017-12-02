var TYPES = ['BARRIER', 'CHERRY', 'FOOD', 'OPEN'];

export default function PacManBoard (p) {
  p.SIZE = 25;
  p.DIMENTIONS = 20;
  p.feild = [];
  p.fieldMap = [
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
    "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
    ]


  p.setup = function () {
    p.createCanvas(500,500);
    p.feild = p.generateFeild();
  };


//Setting up Board boxes
  p.draw = function() {
    //setting initial background to grey
    p.background(51);

    //// DRAW TILES
    for (var i = 0; i < p.feild.length; i++) {
      p.feild[i].draw();
    }
    //Draws text to the screen
    p.text(p.fieldMap, p.width/2, 50)
  };

//Generating Feild
  p.generateFeild = function() {
    p.f = [];

    for (var i = 0; i < p.fieldMap.length; i++) {
      p.row = p.fieldMap[i].split(" ")
      for (var j = 0; j < p.row.length; j++) {
        p.type = p.parseType(p.row[i]);
        p.feildMap.push(i % 20, Math.floor(i/20), p.type)
      }
    }
    // for (var i = 0; i < 400; i++){
    //   p.f.push(new Tile(i % 20, Math.floor(i / 20), 'BARRIER'))
    // }
    // return p.f;
  }

  p.parseType = function(t) {
    switch(t) {
      case "0":
        return "BARRIER";
      case "1":
        return "OPEN";
      case "2":
        return "FOOD";
      case "3":
        return "CHERRY";
    }
  }


////////////////MAKING THE SQUARES WITH DIFFERNT FEATURES/////////////////////

var Tile = function (x,y, type) {
    this.x = x;
    this.y = y;
    this.type = type
    //Use these belowto center balls
    this.HALF_SIZE = p.SIZE/ 2;
    this.THIRD_SIZE = p.SIZE/ 3;
    this.QUARTER_SIZE = p.SIZE/ 4;

  Tile.prototype.draw = function() {

    switch (this.type) {
      case 'BARRIER':
        //sets the weight of the stroke used for lines
        p.strokeWeight(5);
        //sets color to draw the lines and borders around shapes- BLACK
        p.stroke(0);
        //sets color to fill shapes
        p.fill('#0000FF');
        //drawing a rectangle with a location(a, b) and width and height of p.SIZE
        p.rect(this.x * p.SIZE , this.y * p.SIZE , p.SIZE, p.SIZE);
      break;

      case 'FOOD':
        //make the fill of ellipse to upper left hand corner
        //centers dots
        p.ellipseMode(p.CORNER);
        //disbles drawing the stroke(outline)
        p.noStroke()
        //fill === white
        p.fill(255);
        //draws an oval to the screen(a,b)- set location, (c,d)- set the width and height
        p.ellipse(this.x * p.SIZE + this.THIRD_SIZE, this.y * p.SIZE + this.THIRD_SIZE, this.THIRD_SIZE, this.THIRD_SIZE);
      break;

      case 'CHERRY':
        p.ellipseMode(p.CORNER);
        p.strokeWeight(1);
        p.stroke(255);
        p.fill('#FF2222');
        p.ellipse(this.x * p.SIZE + this.QUARTER_SIZE, this.y * p.SIZE + this.QUARTER_SIZE, this.HALF_SIZE, this.HALF_SIZE);
      break;

      case 'OPEN':

      break;
    }
  }
}

//////extra functions //////







}
