import { Container, Sprite, Polygon, Texture } from 'pixi.js';

import type { Game } from './game';
import { Tiles, TeamColors, TILE_HEIGHT, TILE_WIDTH, MAX_TILE_LEVEL } from './constants';
import { createMatrix } from './utils';

interface Tile {
  color: TeamColors;
  level: number;
  sprite: Sprite;
}

export class World {
  public container: Container;
  public tiles: Tile[][];

  public tilesByTeamColor: Record<TeamColors, Texture[]>;

  constructor(game: Game, tileMap: Tiles[][]) {
    if (!game.assets) {
      throw new Error("Can't create the world without loading the game assets");
    }

    if (!tileMap) {
      throw new Error("Can't create the world without a tile map");
    }

    this.tilesByTeamColor = {
      [TeamColors.NEUTRAL]: [game.assets.tiles.textures.default],
      [TeamColors.RED]: [
        game.assets.tiles.textures.red1,
        game.assets.tiles.textures.red2,
        game.assets.tiles.textures.red3,
        game.assets.tiles.textures.red4,
      ],
      [TeamColors.BLUE]: [
        game.assets.tiles.textures.blue1,
        game.assets.tiles.textures.blue2,
        game.assets.tiles.textures.blue3,
        game.assets.tiles.textures.blue4,
      ],
      [TeamColors.YELLOW]: [
        game.assets.tiles.textures.yellow1,
        game.assets.tiles.textures.yellow2,
        game.assets.tiles.textures.yellow3,
        game.assets.tiles.textures.yellow4,
      ],
      [TeamColors.GREEN]: [
        game.assets.tiles.textures.green1,
        game.assets.tiles.textures.green2,
        game.assets.tiles.textures.green3,
        game.assets.tiles.textures.green4,
      ],
    };

    const rows = tileMap.length;
    const columns = tileMap[0].length;

    const container = new Container();
    const tiles = createMatrix<Tile>(columns, rows);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const tileType = tileMap[y][x];

        if (tileType === Tiles.EMPTY) {
          continue;
        }

        const screen = game.toScreen(x, y);

        const tile: Tile = {
          color: TeamColors.NEUTRAL,
          level: -1,
          sprite: new Sprite(game.assets.tiles.textures.default),
        };

        tiles[y][x] = tile;

        tile.sprite.hitArea = new Polygon([
          0,
          TILE_HEIGHT / 2,
          TILE_WIDTH / 2,
          0,
          TILE_WIDTH,
          TILE_HEIGHT / 2,
          TILE_WIDTH / 2,
          TILE_HEIGHT / 2,
        ]);

        tile.sprite.onpointerenter = () => {
          game.selected.x = x;
          game.selected.y = y;
        };

        tile.sprite.onpointerdown = () => {
          game.onSelectTile(x, y);
        };

        tile.sprite.x = screen.x;
        tile.sprite.y = screen.y;

        // Better cursor detection than static
        tile.sprite.eventMode = 'dynamic';

        container.addChild(tile.sprite);
      }
    }

    this.container = container;
    this.tiles = tiles;
  }

  public setTile(tile: Tile, color: TeamColors, level: number): void {
    tile.color = color;

    if (level < MAX_TILE_LEVEL) {
      tile.level = level;
    }

    tile.sprite.texture = this.tilesByTeamColor[tile.color][tile.level];
  }
}
