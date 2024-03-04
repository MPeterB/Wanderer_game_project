export type Tile = {
  image: HTMLImageElement;
};

export const wall: Tile = {
  image: document.getElementById('wall') as HTMLImageElement,
};

export const floor: Tile = {
  image: document.getElementById('floor') as HTMLImageElement,
};
