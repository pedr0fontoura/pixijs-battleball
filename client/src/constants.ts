export const COLORS = {
  SKY: '#72cce9',
};

// Specify values for the sake of readability when creating the terrain
export enum Tiles {
  EMPTY = 0,
  DEFAULT = 1,
}

export const TILE_MAP: Tiles[][] = [
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
];

export const TILE_WIDTH = 30;
export const TILE_HEIGHT = 15;

export const TILE_ATLAS = {
  frames: {
    default: {
      frame: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    red1: {
      frame: { x: 0, y: TILE_HEIGHT, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    red2: {
      frame: { x: TILE_WIDTH, y: TILE_HEIGHT, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    red3: {
      frame: { x: TILE_WIDTH * 2, y: TILE_HEIGHT, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    red4: {
      frame: { x: TILE_WIDTH * 3, y: TILE_HEIGHT, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    blue1: {
      frame: { x: 0, y: TILE_WIDTH, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    blue2: {
      frame: { x: TILE_WIDTH, y: TILE_WIDTH, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    blue3: {
      frame: { x: TILE_WIDTH * 2, y: TILE_WIDTH, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    blue4: {
      frame: { x: TILE_WIDTH * 3, y: TILE_WIDTH, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    yellow1: {
      frame: { x: 0, y: 45, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    yellow2: {
      frame: { x: TILE_WIDTH, y: 45, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    yellow3: {
      frame: { x: TILE_WIDTH * 2, y: 45, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    yellow4: {
      frame: { x: TILE_WIDTH * 3, y: 45, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    green1: {
      frame: { x: 0, y: TILE_HEIGHT * 4, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    green2: {
      frame: { x: TILE_WIDTH, y: TILE_HEIGHT * 4, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    green3: {
      frame: { x: TILE_WIDTH * 2, y: TILE_HEIGHT * 4, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
    green4: {
      frame: { x: TILE_WIDTH * 3, y: TILE_HEIGHT * 4, w: TILE_WIDTH, h: TILE_HEIGHT },
      sourceSize: { w: TILE_WIDTH, h: TILE_HEIGHT },
      spriteSourceSize: { x: 0, y: 0, w: TILE_WIDTH, h: TILE_HEIGHT },
    },
  },
  meta: {
    image: 'assets/tiles.png',
    format: 'RGBA8888',
    size: { w: TILE_WIDTH * 4, h: TILE_HEIGHT * 5 },
    scale: '1',
  },
  animations: {
    default: ['default1', 'default2', 'default3', 'default4'],
    red: ['red1', 'red2', 'red3', 'red4'],
    blue: ['blue1', 'blue2', 'blue3', 'blue4'],
    yellow: ['yellow1', 'yellow2', 'yellow3', 'yellow4'],
    green: ['green1', 'green2', 'green3', 'green4'],
  },
};
