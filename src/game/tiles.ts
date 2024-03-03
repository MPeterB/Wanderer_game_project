export type tile = {
  image: HTMLImageElement;
  occupied: boolean;
};

export const wall: tile = {
  image: document.getElementById('wall') as HTMLImageElement,
  occupied: true,
};

export const floor: tile = {
  image: document.getElementById('floor') as HTMLImageElement,
  occupied: false,
};
