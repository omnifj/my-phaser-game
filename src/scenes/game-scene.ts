import * as Phaser from "phaser";
import { SCENE_KEYS } from "../common/scene-keys.ts";
import { ASSET_KEYS } from "../common/assets.ts";

export class GameScene extends Phaser.Scene {
  #cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  #player!: Phaser.GameObjects.Image;
  #playerSpeed!: number;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  init() {
    this.#playerSpeed = 500;
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
    this.#player = this.add.image(width / 2, height, ASSET_KEYS.JAR);
    this.add
      .image(width / 2, height / 2, ASSET_KEYS.OBJECTS, "button2.png")
      .setScale(0.75);

    const keyboard = this.input.keyboard;
    if (!keyboard) {
      return;
    }

    this.#cursorKeys = keyboard.createCursorKeys();
  }

  update(time: number, delta: number) {

    const moveStep = this.#playerSpeed * (delta / 1000);

    if (this.#cursorKeys.left.isDown) {
      this.#player.x -= moveStep;
    } else if (this.#cursorKeys.right.isDown) {
      this.#player.x += moveStep;
    }

    if(this.#player.x- this.#player.width/2 < 0) {
      this.#player.x = this.#player.width/2;
    }else if(this.#player.x + this.#player.width/2 > this.scale.width) {
      this.#player.x = this.scale.width - this.#player.width/2;
    }

  }
}
