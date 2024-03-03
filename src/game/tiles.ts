export type tile = {
  image: HTMLImageElement;
  spawnable: boolean;
  walkable: boolean;
  occupied: boolean;
};

export const wall: tile = {
  image: document.getElementById('wall') as HTMLImageElement,
  spawnable: false,
  walkable: false,
  occupied: true,
};

export const floor: tile = {
  image: document.getElementById('floor') as HTMLImageElement,
  spawnable: true,
  walkable: true,
  occupied: false,
};
