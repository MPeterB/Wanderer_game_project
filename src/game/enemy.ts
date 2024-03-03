import {
  skeleton1Current,
  skeleton2Current,
  skeleton3Current,
  bossCurrent,
} from './characterPositions.ts';
import { drawEnemy } from './enemySpawn.ts';
import { moveEnemy } from './enemyMovement.ts';

export const canvasE = document.querySelector('.enemy-canvas') as HTMLCanvasElement;
export const ctxE = canvasE.getContext('2d') as CanvasRenderingContext2D;

export const skeleton = document.getElementById('skeleton') as HTMLImageElement;
export const boss = document.getElementById('boss') as HTMLImageElement;

export function drawEnemies(): void {
  drawEnemy(skeleton, skeleton1Current);
  drawEnemy(skeleton, skeleton2Current);
  drawEnemy(skeleton, skeleton3Current);
  drawEnemy(boss, bossCurrent);
}

const seconds: number = 1;

export function moveEnemies(): void {
  setInterval(() => {
    ctxE.clearRect(0, 0, canvasE.width, canvasE.height);
    moveEnemy(skeleton, skeleton1Current);
    moveEnemy(skeleton, skeleton2Current);
    moveEnemy(skeleton, skeleton3Current);
    moveEnemy(boss, bossCurrent);
  }, seconds * 1000);
}
