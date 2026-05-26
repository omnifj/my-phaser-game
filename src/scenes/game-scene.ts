import * as Phaser from "phaser";
import { SCENE_KEYS } from "../common/scene-keys.ts";
import { ASSET_KEYS } from "../common/assets.ts";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  /**
   * @public
   * Tied to the Phaser Scene lifecycle. Will run one time after the PRELOAD
   * logic is finished. Runs each time the Phaser Scene restarts.
   * @returns {void}
   */
  create() {
    // add game background
    const { width, height } = this.scale;

    // 添加游戏背景和其他元素
    this.add.image(width / 2, height / 2, ASSET_KEYS.BACKGROUND);
    this.add.image(width / 2, height, ASSET_KEYS.JAR);
    this.add.image(width / 2, height / 2, ASSET_KEYS.OBJECTS, "button2.png").setScale(0.75);
  }
}
