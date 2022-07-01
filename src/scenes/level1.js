var player;
var stars;
var redStars;
var bombs;
var cursors;
var score;
var gameOver;
var scoreText;
var tiempo;
var textoCronometro;

export class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "public/assets/tilemaps/map.json");
    this.load.image("tilesBelow", "public/assets/images/sky-atlas.png");
    this.load.image("tilesPlatform1", "public/assets/images/platform-atlas.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    const tilesetBelow = map.addTilesetImage("sky-atlas", "tilesBelow");
    const tilesetPlatform = map.addTilesetImage("platform-atlas", "tilesPlatform1");

    const belowLayer = map.createLayer("sky", tilesetBelow, 0, 0);
    const worldLayer = map.createLayer("platform", tilesetPlatform, 0, 0);
    const objectsLayer = map.getObjectLayer("objects");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject("objects", (obj) => obj.name === "dude");
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }

    stars = this.physics.add.group();
    redStars = this.physics.add.group();
    
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "stars": { 
        var star = stars.create(x, y, "star");
        star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        break;
        }
      }
    });
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "redStars": { 
        var redStar = redStars.create(x, y, "redStar");
        redStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        break;
        }
      }
    });

    bombs = this.physics.add.group();

    scoreText = this.add.text(30, 6, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });


    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    bombs.createMultiple({key: "bomb", repeat: 1})
    bombs.children.iterate((bomb) => {
    bomb.setX(x);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
    })

    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(stars, worldLayer);
    this.physics.add.collider(redStars, worldLayer);
    this.physics.add.collider(bombs, worldLayer);

    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.overlap(player, redStars, this.collectRedStar, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    gameOver = false;
    score = 0;
    tiempo = 6;
    this.time.addEvent({delay: 1000, callback: this.cronometro, callbackScope: this, loop: true})

    textoCronometro = this.add.text(0, 0, "tiempo: 60")
  }

  update ()
  {
    if (gameOver){
      return;
    }

    if (cursors.left.isDown) 
    {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
      player.setVelocityX(160);
      player.anims.play('right', true);
    }
    else
    {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.blocked.down)
    {
      player.setVelocityY(-375);
    }
  }

  collectRedStar (player, redStar)
  {
    redStar.disableBody(true, true);
    score += 15;
    scoreText.setText('Puntuación: ' + score);    
    if ((redStars.countActive(true) === 0) && (stars.countActive(true) === 0)) {
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, child.y, true, true);
      }),
      redStars.children.iterate(function (child) {
        child.enableBody(true, child.x, child.y, true, true);
      });
    }
  };

  collectStar (player, star)
  {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Puntuación: ' + score);
    if ((redStars.countActive(true) === 0) && (stars.countActive(true) === 0)) {
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, child.y, true, true);
      }),
      redStars.children.iterate(function (child) {
        child.enableBody(true, child.x, child.y, true, true);
      });
    }
  }


  hitBomb (player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;

    setTimeout(() => {
      this.scene.start(
        "Retry",
        { score: score } 
      );
    }, 1000);
  }
  cronometro () {
    tiempo = tiempo - 1
    textoCronometro.setText("tiempo: " + tiempo)
    if (tiempo <= 0){
      this.scene.start("Level2");  
    }
  }
}