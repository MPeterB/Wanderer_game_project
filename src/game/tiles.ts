export type tile = {
  image: HTMLImageElement;
};

export const wall: tile = {
  image: document.getElementById('wall') as HTMLImageElement,
};

export const floor: tile = {
  image: document.getElementById('floor') as HTMLImageElement,
};
