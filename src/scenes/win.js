import Button from "../js/button.js";

var score2;

export class Win extends Phaser.Scene {
  constructor() {
    super("Win");
  }

  init(data) {
    score2 = data.score2;
  }
  create() {
    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "mainmenu_bg"
      )
      .setScale(1.1);

    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        `Has ganado el juego, tu puntaje es de: ${score2}`
      )
      .setOrigin(0.5);

    const boton = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "REINICIAR NIVELES",
      this,
      () => {
        this.scene.start("Level1");
      }
    );
  }
}