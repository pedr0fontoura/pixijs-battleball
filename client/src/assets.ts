import { BaseTexture, SCALE_MODES, Spritesheet } from 'pixi.js';

import { TILE_ATLAS } from './constants';

const useNearestScaleModeForTexture = <T extends BaseTexture>(texture: T): T => {
  texture.scaleMode = SCALE_MODES.NEAREST;

  return texture;
};

// See https://github.com/pixijs/pixijs/pull/9448 for Spritesheet type inference
export type GameAssets = Awaited<ReturnType<typeof loadGameAssets>>;

export const loadGameAssets = async () => {
  const tiles = new Spritesheet(useNearestScaleModeForTexture(BaseTexture.from(TILE_ATLAS.meta.image)), TILE_ATLAS);

  await Promise.all([tiles.parse()]);

  return {
    tiles,
  };
};
