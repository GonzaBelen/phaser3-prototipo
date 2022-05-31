import Button from "../js/button.js";

export class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu")
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'mainmenu_bg').setScale(1.1);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY/1.5, 'phaser_logo');

        const boton = new Button(this.cameras.main.centerX, this.cameras.main.centerY + this.cameras.main.centerY/3, 'JUGAR', this, () => {
            this.scene.start("Play");
        });
    }
}