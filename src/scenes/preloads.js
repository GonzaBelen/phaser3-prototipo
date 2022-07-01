export class Preloads extends Phaser.Scene {
  constructor() {
    super("Preloads");
  }

  preload() {
    this.load.image("mainmenu_bg", "public/assets/images/background.png");
    this.load.image("phaser_logo", "public/assets/images/phaser_logo.png");
    this.load.image('background', 'public/assets/images/sky.png');
    this.load.image('ground', 'public/assets/images/platform.png');
    this.load.image('star', 'public/assets/images/star.png');
    this.load.image('redStar', 'public/assets/images/redStar.png');
    this.load.image('bomb', 'public/assets/images/bomb.png');
    this.load.spritesheet('dude', 'public/assets/images/dude.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("MainMenu");
  }
}
