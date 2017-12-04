import $ from 'jquery';
var TYPES = ['BARRIER', 'CHERRY', 'FOOD', 'OPEN', 'GHOST','PACMAN'];
var FEILD = [
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  "0,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0",
  "0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0",
  "0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0",
  "0,1,1,1,1,1,1,1,0,4,1,4,0,1,1,1,1,3,1,0",
  "0,1,1,1,1,3,1,1,0,4,1,4,0,1,1,1,1,1,1,0",
  "0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,0,0",
  "0,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0",
  "0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0",
  "0,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,0",
  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
];
 var PACMAN;
 var SCORE;
 var GHOST;
 var ENDSCORE = 5;
 var OTHERSCORE =241;

export default function PacManBoard (p) {
  p.SIZE = 25;
  p.DIMENTIONS = 20;
  p.feild = [];
  p.pacX;
  p.pacY;


  p.setup = function () {
    p.createCanvas(500,535);
    SCORE = 0;
    GHOST = [];
    p.feild = p.generateFeild();
  };


//Setting up Board boxes
  p.draw = function() {
    //setting initial background to grey
    p.background(51);

    //* DRAW TILES *//
    for (var i = 0; i < p.feild.length; i++) {
      if (p.feild[i].intact) {
        //p.feild[i].update();
        p.feild[i].draw();
      }
    }

    for (var j = 0; j < GHOST.length; j++) {
      GHOST[j].update();
      GHOST[j].draw();
    }

    PACMAN.update();
    PACMAN.draw();
    //////Making the score//////
    p.noStroke(0);
    p.fill(255);
    p.textSize(30);
    p.text(SCORE, 5, 550 - 22);
    ////////////////////////////

    p.handlePacman();
  };

  p.endGame = function(won) {
    p.textSize(60);
    p.textAlign(p.CENTER);
    p.fill(255);
    p.stroke(0);
    p.strokeWeight(5);

    if(won) {
      p.text('You Win!!!!!', 500/2, 500/2 )
    } else {
      p.text('You Lose!', 500/2, 500/2 )
    }

    p.textSize(30);
    p.text('Press Refresh Page to Restart', 500/2, 500/2 + 50);
    p.noLoop();
  }


//Generating Feild
  p.generateFeild = function() {
    p.f = [];

    for (var i = 0; i < FEILD.length; i++) {
      p.row = FEILD[i].split(",");

      for (var j = 0; j < p.row.length; j++) {
        p.type = p.parseType(p.row[j]);
        p.tile = new Tile(j, i, p.type);

        switch (p.type) {
          case 'PACMAN':
            PACMAN = p.tile;
            break;
          case 'GHOST':
            GHOST.push(p.tile);
            break;
          case 'CHERRY':
            ENDSCORE += 10;
            break;
          case 'FOOD':
            ENDSCORE++;
            break;
        }
        p.f.push(p.tile);
      }
    }
    return p.f;
  }

  //PackMan Movements
  p.handlePacman= function() {
  //console.log(PACMAN)
    if (p.keyIsDown(p.UP_ARROW)) {
      PACMAN.move(0, -1);
    } else if (p.keyIsDown(p.DOWN_ARROW)) {
      PACMAN.move(0, 1);
    } else if (p.keyIsDown(p.LEFT_ARROW)) {
      PACMAN.move(-1, 0);
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      PACMAN.move(1, 0);
    }
  };

  p.parseType = function(t) {
    switch(t) {
      case "0":
        return "BARRIER";
      case "1":
        return "FOOD";
      case "2":
        return "OPEN";
      case "3":
        return "CHERRY";
      case "4":
        return "GHOST";
      case "5":
        return "PACMAN";
    }
  };


////////////////MAKING THE SQUARES WITH DIFFERNT FEATURES/////////////////////

var Tile = function (x,y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.intact = true;

    this.dX = -1;
    this.dY = -1;
    this.moving = false;

    this.speed = 0.6;

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

      case 'PACMAN':
        p.ellipseMode(p.CORNER);
        p.strokeWeight(5);
        p.stroke('#FFFF00');
        p.fill('#FFFF33');
        p.ellipse(this.x * p.SIZE + this.QUARTER_SIZE, this.y * p.SIZE + this.QUARTER_SIZE, this.HALF_SIZE, this.HALF_SIZE);
        // var preLoad = function() {
        //   p.img = p.loadImage('/Users/begonaguereca/Javascript/HackReactor/Legacy/Sesa.me/client/src/components/user/PacManView/pacMan.gif', function(img) {
        //     p.image(p.img, this.x * p.SIZE + this.QUARTER_SIZE, this.y * p.SIZE + this.QUARTER_SIZE, this.HALF_SIZE, this.HALF_SIZE);
        //   });
        // }
        // preLoad();
      break;

      case 'GHOST':
        //Making a Triangle to fit the box!
        p.fill('#FF00EE');
        p.stroke(0);
        p.strokeWeight(1);
        p.beginShape();
        p.vertex(this.x * p.SIZE + this.HALF_SIZE, this.y * p.SIZE + this.QUARTER_SIZE);
        p.vertex(this.x * p.SIZE + this.QUARTER_SIZE, this.y *  p.SIZE + (this.QUARTER_SIZE * 3));
        p.vertex(this.x * p.SIZE + (this.QUARTER_SIZE * 3), this.y *  p.SIZE + (this.QUARTER_SIZE * 3));
        p.endShape(p.CLOSE);
      break;

      case 'OPEN':

      break;
    }
  }

  //The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
  Tile.prototype.update = function() {
    if (!this.intact) {
      return;
    }
    //* Movement *//
    if (this.moving) {
      //lerp(start, stop, amt)
      this.x = p.lerp(this.x, this.dX, this.speed);
      this.y = p.lerp(this.y, this.dY, this.speed);

      console.log(this.x, ' ', this.y, ' ', this.dY, ' ', this.dX)

      if ((Math.abs(this.x - this.dX)) < 0.05 && (Math.abs(this.y - this.dY) < 0.05)) {
        this.x = this.dX;
        this.y = this.dY;
        this.moving = false;
      }
    }
  }

  Tile.prototype.move = function(x, y) {
    console.log('im inside move');
    var dY = this.y + y;
    var dX = this.x + x;

    if (this.moving) {
      return;
    }

    var destinationTile = p.feild[dY * p.DIMENTIONS + dX];
    var nextType = destinationTile.type;

    if ((nextType === 'BARRIER' && this.type !== 'BARRIER') ||
        nextType === 'GHOST' && this.type === 'GHOST') {
      ///don't allow them to move
      return;
    }
    this.dX = dX;
    this.dY = dY;
    this.moving = true;

    //*EATING*//
    if (this.type === 'PACMAN') {

      var dtileX = Math.floor(this.x);
      var dtileY = Math.floor(this.y);

      var dTile = p.feild[dtileY * p.DIMENTIONS + dtileX];
      var newTileType = dTile.type;

      if (dTile.intact) {
        switch(newTileType) {
          case "CHERRY":
          dTile.intact = false;
          SCORE+= 10;
          break;

          case "FOOD":
          SCORE++;
          dTile.intact = false;
          break;

          case "GHOST":
          p.endGame(false);
          break;
        };
      };

    } else if (this.type === 'GHOST') {
      //*AI*//

    };

    console.log('---------------------------------')
    console.log('score: ', SCORE, 'endscore:, ',ENDSCORE  )
    if (SCORE === OTHERSCORE) {
      p.endGame(true);
    };

  };
};

//////extra functions //////
  function getTile(x, y) {
    return p.field[y * 20 + x];
  }

}
