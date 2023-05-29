import { Application, Sprite, Point } from 'pixi.js';

import { COLORS, Tiles, TILE_WIDTH, TILE_HEIGHT, TeamColors } from './constants';
import { isHTMLCanvasElement } from './utils';
import { GameAssets, loadGameAssets } from './assets';
import { World } from './world';

declare global {
  // eslint-disable-next-line no-var
  var __PIXI_APP__: Application;
}

export class Game {
  public app: Application;

  public origin: Point;
  public selected: Point;

  public assets: GameAssets | undefined;

  public world: World | undefined;
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

    this.app.ticker.add(this.tick);

    // Expose Pixi instance to DEVTOOLS
    globalThis.__PIXI_APP__ = this.app;
  }

  public async init(tileMap: Tiles[][]): Promise<void> {
    this.assets = await loadGameAssets();

    const world = new World(this, tileMap);
    const marker = new Sprite(this.assets.tiles.textures.marker);
    marker.eventMode = 'passive';

    this.world = world;
    this.marker = marker;

    this.app.stage.addChild(world.container);
    this.app.stage.addChild(marker);
  }

  public tick = (): void => {
    if (this.marker) {
      const screen = this.toScreen(this.selected.x, this.selected.y);

      this.marker.x = screen.x;
      this.marker.y = screen.y;
    }
  };

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

  public onSelectTile(x: number, y: number): void {
    if (!this.world) return;

    const tile = this.world.tiles[y][x];
    this.world.setTile(tile, TeamColors.RED, tile.level + 1);
  }
}
