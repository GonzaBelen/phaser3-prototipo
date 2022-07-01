import { Preloads } from "../scenes/preloads.js";
import { MainMenu } from "../scenes/mainmenu.js";
import { Level1 } from "../scenes/level1.js";
import { Level2 } from "../scenes/level2.js";
import { Retry } from "../scenes/retry.js";
import { Retry2 } from "../scenes/retry2.js";
import { Win } from "../scenes/win.js";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 375 },
      debug: false,
    },
  },
  scene: [Preloads, MainMenu, Level1, Level2, Retry, Retry2, Win],
};

window.game = new Phaser.Game(config);
