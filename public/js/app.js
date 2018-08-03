window.onload = function() {

  const config = {
    width: 640,
    height: 480,
    pixelArt: true,
    renderer: Phaser.CANVAS,
    antialias: true,
    multiTexture: true,
    disableVisibilityChange: true,
    state: {
      preload: preload,
      create: create,
    }
  };

  const game = new Phaser.Game(config);
  
  let frame = 0;
  let text;

  let redFlower;
  let redFlowerCycle;
  let desk;
  let waterLevel;
  let waterLevelVal = 0;


  function preload() {

    this.load.spritesheet('redFlower', 'assets/red_flower.png', 40, 73, 6);
    this.load.spritesheet('redFlowerCycle', 'assets/red_flower_cycle.png', 40, 73, 16);
    this.load.image('desk', 'assets/desk.png');

  } 

  function create() {

    //Background 
    desk = this.add.sprite(this.world.centerX - 72 , this.world.centerY + 72, 'desk');
    desk.anchor.set(0.5);
    desk.scale.setTo(1.3);
    
    //Water level bar background
    waterLevel = this.add.graphics();

    waterLevel.beginFill(0x2a3547);
    waterLevel.lineStyle(2, 0x2a3547, 1);
    waterLevel.drawRoundedRect(460, 430, 150, 15, 4);

    //Water level bar
    waterLevel.beginFill(0x4286f4);
    waterLevel.lineStyle(2, 0x2a3547, 1);
    waterLevel.drawRoundedRect(460, 430, waterLevelVal, 15, 4);



    //Main game object
    redFlowerCycle = this.add.sprite(this.world.centerX, this.world.centerY - 30, 'redFlowerCycle', frame);
    redFlowerCycle.anchor.set(0.5);
    redFlowerCycle.scale.setTo(1.5);
    redFlowerCycle.inputEnabled = true;
    //Debuging text
    text = this.add.text(this.world.centerX, 30, '', {fill: '#ffffff'});
    text.anchor.set(0.5);
    //Setting up listener for input for the main game object
    redFlowerCycle.events.onInputDown.add(listener, this);
  }

  function listener () {
    //update water level bar on click
    waterLevelVal += 10;
    if (waterLevelVal > 150) waterLevelVal = 0;

    waterLevel.beginFill(0x2a3547);
    waterLevel.lineStyle(2, 0x2a3547, 1);
    waterLevel.drawRoundedRect(460, 430, 150, 15, 4);

    waterLevel.beginFill(0x4286f4);
    waterLevel.lineStyle(2, 0x2a3547, 1);
    waterLevel.drawRoundedRect(460, 430, waterLevelVal, 15, 4);

    //update flower sprite frame on click
    frame++;
    if (frame >= 17) frame = 0;

    text.text = "You are viewing frame " + frame;
    if (frame < 8) {
      redFlowerCycle.frame = frame;
    } else if (frame == 8) {
      redFlowerCycle.loadTexture('redFlower');
      redFlowerCycle.animations.add('shine');
      redFlowerCycle.animations.play('shine', 5, true);
    } else {
      redFlowerCycle.loadTexture('redFlowerCycle');
      redFlowerCycle.frame = frame - 1;
    }
  }
};
