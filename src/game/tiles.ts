type tile = {
  image: HTMLImageElement,
  walkable: boolean;
  occupied: boolean;
};

export const wall: tile = {
  image: document.getElementById('wall') as HTMLImageElement,
  walkable: false,
  occupied: true,
};

export const floor: tile = {
  image: document.getElementById('floor') as HTMLImageElement,
  walkable: true,
  occupied: false,
};
