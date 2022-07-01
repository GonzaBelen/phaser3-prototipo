import Button from "../js/button.js";

var score;

export class Retry2 extends Phaser.Scene {
  constructor() {
    super("Retry2");
  }

  init(data) {
    score = data.score2;
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
        `Puntaje alcanzado: ${score}`
      )
      .setOrigin(0.5);

    const boton = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "REINTENTAR",
      this,
      () => {
        this.scene.start("Level1");
      }
    );
  }
}