import { Application, Container, Sprite } from 'pixi.js';

import { COLORS, Tiles, TILE_WIDTH, TILE_HEIGHT } from './constants';
import { isHTMLCanvasElement } from './utils';
import { GameAssets, loadGameAssets } from './assets';

declare global {
  // eslint-disable-next-line no-var
  var __PIXI_APP__: Application;
}

interface Point {
  x: number;
  y: number;
}

export class Game {
  public app: Application;

  public assets: GameAssets | undefined;

  public tileMap: Tiles[][] | undefined;

  constructor() {
    const view = document.getElementById('app');

    if (!isHTMLCanvasElement(view)) {
      throw new Error('Failed to locate the application container');
    }

    this.app = new Application({
      view,
      resizeTo: window,
      background: COLORS.SKY,
      antialias: false, // Game uses a pixelated art style
    });

    // Expose Pixi instance to DEVTOOLS
    globalThis.__PIXI_APP__ = this.app;
  }

  public async init(tileMap: Tiles[][]): Promise<void> {
    this.tileMap = tileMap;

    this.assets = await loadGameAssets();

    const world = this.createWorld();

    this.app.stage.addChild(world);
  }

  public toScreen(x: number, y: number): Point {
    return {
      x: this.app.view.width / 2 + (x - y) * Math.floor(TILE_WIDTH / 2),
      y: this.app.view.height / 2 + (x + y) * Math.floor(TILE_HEIGHT / 2),
    };
  }

  public createWorld(): Container {
    if (!this.assets) {
      throw new Error("Can't create the world without loading the game assets");
    }

    if (!this.tileMap) {
      throw new Error("Can't create the world without a tile map");
    }

    const world = new Container();

    const rows = this.tileMap.length;
    const columns = this.tileMap[0].length;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const tileType = this.tileMap[y][x];

        if (tileType === Tiles.EMPTY) {
          continue;
        }

        const screen = this.toScreen(x, y);

        const tile = new Sprite(this.assets.tiles.textures.default);
        tile.x = screen.x;
        tile.y = screen.y;

        world.addChild(tile);
      }
    }

    return world;
  }
}
