import { Application, Container, Sprite, Point } from 'pixi.js';

import { COLORS, Tiles, TILE_WIDTH, TILE_HEIGHT } from './constants';
import { isHTMLCanvasElement } from './utils';
import { GameAssets, loadGameAssets } from './assets';

declare global {
  // eslint-disable-next-line no-var
  var __PIXI_APP__: Application;
}

export class Game {
  public app: Application;

  public origin: Point;
  public selected: Point;

  public assets: GameAssets | undefined;

  public tileMap: Tiles[][] | undefined;
  public marker: Sprite | undefined;

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

    // Origin in tile space
    this.origin = new Point(
      Math.floor(this.app.view.width / 2 / TILE_WIDTH),
      Math.floor(this.app.view.height / 2 / TILE_HEIGHT)
    );

    this.selected = new Point(0, 0);

    this.app.stage.eventMode = 'static';

    this.app.stage.onglobalpointermove = (e) => {
      const tile = this.toTile(e.globalX, e.globalY);
      const world = this.toWorld(tile.x, tile.y);

      this.selected.x = world.x;
      this.selected.y = world.y;

      if (this.marker) {
        const screen = this.toScreen(world.x, world.y);

        // Marker needs to be center aligned with the tile sprite
        this.marker.x = screen.x - (this.marker.width - TILE_WIDTH) / 2;
        this.marker.y = screen.y - (this.marker.height - TILE_HEIGHT) / 2;
      }
    };

    // Expose Pixi instance to DEVTOOLS
    globalThis.__PIXI_APP__ = this.app;
  }

  public async init(tileMap: Tiles[][]): Promise<void> {
    this.tileMap = tileMap;

    this.assets = await loadGameAssets();

    const world = this.createWorld();
    const marker = new Sprite(this.assets.tiles.textures.marker);

    this.marker = marker;

    this.app.stage.addChild(world);
    this.app.stage.addChild(marker);
  }

  public toScreen(x: number, y: number): Point {
    return new Point(
      this.origin.x * TILE_WIDTH + (x - y) * (TILE_WIDTH / 2),
      this.origin.y * TILE_HEIGHT + (x + y) * (TILE_HEIGHT / 2)
    );
  }

  public toTile(x: number, y: number): Point {
    return new Point(Math.floor(x / TILE_WIDTH), Math.floor(y / TILE_HEIGHT));
  }

  public toWorld(x: number, y: number): Point {
    return new Point(y - this.origin.y + (x - this.origin.x), y - this.origin.y - (x - this.origin.x));
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
