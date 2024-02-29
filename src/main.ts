import './style.css';
import { drawMap, map } from './map.ts';

export const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

window.onload = (): void => {
  drawMap(map);
};
