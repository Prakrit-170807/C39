class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('GameMode');
    gameStateRef.on("value",function(data){
       GameMode = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      GameMode: state
    });
  }

  async start(){
    if(GameMode === 0){
      player = new Player();
      var playerCountRef = await database.ref('Players').once("value");
      if(playerCountRef.exists()){
        Players = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200)
    car2 = createSprite(300,200)
    car3 = createSprite(500,200)
    car4 = createSprite(700,200)
    Cars = [car1,car2,car3,car4]

    car1.addImage(car1_)
    car2.addImage(car2_)
    car3.addImage(car3_)
    car4.addImage(car4_)

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      image(track_,0,-windowHeight*6,windowWidth,windowHeight*10)
      var Index = 0
      var x=0
      var y
      // var display_position = 130;
      for(var plr in allPlayers){
        Index=Index+1
        x+=100
        y=windowHeight-allPlayers[plr].distance
        Cars[Index-1].x=x
        Cars[Index-1].y=y
        if (Index==player.index){
          Cars[Index-1].shapeColor="red"
          camera.x=windowWidth/2
          camera.y=Cars[Index-1].y
        } 

        // display_position+=20;
        // textSize(15);
        // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites()
  }
}
