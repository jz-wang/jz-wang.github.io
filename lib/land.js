const image = new Image();
image.src = 'land.jpg';

class Land {
  constructor(land){
    this.Land = land;
    this.currentLand = [];

    this.loadLand();
    this.currentPieceNumber = 9;
    this.moveSpeed = 2;
  }

  loadLand(){
    for(let i = 0; i < 10; i++){
      this.currentLand.push(Object.assign({}, this.Land[i]));
    }
  }

  step(){
    if (this.currentLand[0].x < -100){
      this.currentPieceNumber += 1;
      this.queue();
    }
    this.move();
  }

  move(){
    this.currentLand.forEach((piece, i)=>{
      this.currentLand[i].x -= this.moveSpeed;
    });
  }

  queue(){
    this.currentLand.shift();
    if(this.currentPieceNumber === this.Land.length - 1){
      this.currentLand.push(Object.assign({}, this.Land[this.currentPieceNumber]));
      this.currentPieceNumber = 9;
      if (this.moveSpeed < 3.5){
        this.moveSpeed += 0.5;
      } if (this.moveSpeed === 3.5 ){
        this.moveSpeed = 4.5;
      }
    } else {
      this.currentLand.push(Object.assign({}, this.Land[this.currentPieceNumber]));
    }
  }

  draw(ctx){
    if(this.moveSpeed === 2 &&
       this.currentPieceNumber < 20){
         ctx.font = "50px Georgia";
         ctx.strokeText('Level 1', 40, 40);
    } else if(this.moveSpeed === 2.5 &&
       this.currentPieceNumber < 20) {
         ctx.font = "50px Georgia";
         ctx.strokeText('Level 2', 40, 40);
    } else if(this.moveSpeed === 3 &&
       this.currentPieceNumber < 20) {
         ctx.font = "50px Georgia";
         ctx.strokeText('Insane Mode', 40, 40);
    } else if(this.moveSpeed === 4.5 &&
       this.currentPieceNumber < 20) {
         ctx.font = "50px Georgia";
         ctx.strokeText('Alright.', 40, 40);
    }

    this.currentLand.forEach(piece=>{
      ctx.drawImage(
        image,
        16,
        0,
        80,
        100,
        piece.x,
        piece.y,
        piece.width,
        piece.height
      );
    });
  }
}

export default Land;