import * as Phaser from 'phaser'
import { SCENE_KEYS } from './common/scene-keys.ts';
import { GameScene } from './scenes/game-scene.ts';
import { PreloadScene } from './scenes/preload-scene.ts';

/** @type {Phaser.Types.Core.GameConfig} */
const gameConfig = {
  type: Phaser.AUTO,
  pixelArt: false,
  title: 'Crafty Catch',
  scale: {
    parent: 'game-container',
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
  backgroundColor: '#000000',
};

const game = new Phaser.Game(gameConfig);

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene);
game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
