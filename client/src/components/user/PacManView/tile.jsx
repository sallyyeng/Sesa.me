export default function Tile (x,y, type) {

    this.x = x;
    this.y = y;
    this.type = type

  //console.log('x: ', x, 'y:', y)

  Tile.prototype.draw = function() {
  //  console.log(this)
    switch (this.type) {
      case 'BARRIER':
        this.stroke(0);
        this.fill('#0000FF');
        this.rect(this.x, this.y, this.SIZE, this.SIZE)
      break;

      case 'OPEN':
      break;

      case 'BISCUIT':
      break;

      case 'CHERRY':
      break;
    }
  }
}
