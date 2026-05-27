import * as Phaser from "phaser";
import { SCENE_KEYS } from "../common/scene-keys.ts";
import { ASSET_KEYS } from "../common/assets.ts";

export class GameScene extends Phaser.Scene {
  #cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  #player!: Phaser.GameObjects.Image;
  #playerSpeed!: number;
  #spawnFallingObject!: () => void;
  #fallingObjectFrames!: string[];
  #fallingObject!: Phaser.GameObjects.Image[];
  #fallingObjectSpeed!: number;
  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  init() {
    this.#playerSpeed = 500;
    this.#fallingObjectSpeed = 200;
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
    this.#player = this.add.image(width / 2, height, ASSET_KEYS.JAR).setDepth(1);
    // this.add
    //   .image(width / 2, height / 2, ASSET_KEYS.OBJECTS, "button2.png")
    //   .setScale(0.75);

    const keyboard = this.input.keyboard;
    if (!keyboard) {
      return;
    }

    this.#cursorKeys = keyboard.createCursorKeys();

    this.#fallingObject = [];

    this.#fallingObjectFrames = Object.keys(
      this.textures.get(ASSET_KEYS.OBJECTS).frames,
    ).filter((frame) => frame !== "__BASE");

    // console.log(this.textures.get(ASSET_KEYS.OBJECTS));
    this.#spawnFallingObject = () => {
      const randomframe = Phaser.Utils.Array.GetRandom(
        this.#fallingObjectFrames,
      );
      const obj = this.add.image(
        Phaser.Math.RND.between(50, this.scale.width - 50),
        0,
        ASSET_KEYS.OBJECTS,
        randomframe,
      );
      this.#fallingObject.push(obj);
    };
    this.#spawnFallingObject();

    this.time.addEvent({
      delay: 1000,
      callback: this.#spawnFallingObject,
      loop: true,
    });

    console.log(this.#player.getBounds());


  }

  update(time: number, delta: number) {
    const moveStep = this.#playerSpeed * (delta / 1000);

    if (this.#cursorKeys.left.isDown) {
      this.#player.x -= moveStep;
    } else if (this.#cursorKeys.right.isDown) {
      this.#player.x += moveStep;
    }

    if (this.#player.x - this.#player.width / 2 < 0) {
      this.#player.x = this.#player.width / 2;
    } else if (this.#player.x + this.#player.width / 2 > this.scale.width) {
      this.#player.x = this.scale.width - this.#player.width / 2;
    }

    for (let i = this.#fallingObject.length - 1; i >= 0; i--) {
      const obj = this.#fallingObject[i];
      obj.y += this.#fallingObjectSpeed * (delta / 1000);

      const overlapPoints = Phaser.Geom.Intersects.GetRectangleToRectangle(
        this.#player.getBounds(),
        obj.getBounds(),
      );

      if (overlapPoints.length > 0) {
        obj.destroy();
        this.#fallingObject.splice(i, 1);
        console.log("碰撞发生");
      }


      if (obj.y > this.scale.height) {
        obj.destroy();
        this.#fallingObject.splice(i, 1);
      }
    }
    // this.#spawnFallingObject();

  }
}
