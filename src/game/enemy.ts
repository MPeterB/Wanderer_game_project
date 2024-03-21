import {
  skeleton1Current,
  skeleton2Current,
  skeleton3Current,
  bossCurrent,
} from './characters.ts';
import { drawEnemy, keyToRandomSkeleton } from './enemySpawn.ts';
import { moveEnemy } from './enemyMovement.ts';

export const canvasE = document.querySelector('.enemy-canvas') as HTMLCanvasElement;
export const ctxE = canvasE.getContext('2d') as CanvasRenderingContext2D;

export const skeleton = document.getElementById('skeleton') as HTMLImageElement;
export const boss = document.getElementById('boss') as HTMLImageElement;

export function drawEnemies(): void {
  keyToRandomSkeleton();
  drawEnemy(skeleton, skeleton1Current, skeleton2Current, skeleton3Current, bossCurrent);
  drawEnemy(skeleton, skeleton2Current, skeleton1Current, skeleton3Current, bossCurrent);
  drawEnemy(skeleton, skeleton3Current, skeleton1Current, skeleton2Current, bossCurrent);
  drawEnemy(boss, bossCurrent, skeleton1Current, skeleton2Current, skeleton3Current);
}

const seconds: number = 1;

export function moveEnemies(): void {
  setInterval(() => {
    ctxE.clearRect(0, 0, canvasE.width, canvasE.height);
    moveEnemy(skeleton, skeleton1Current, skeleton2Current, skeleton3Current, bossCurrent);
    moveEnemy(skeleton, skeleton2Current, skeleton1Current, skeleton3Current, bossCurrent);
    moveEnemy(skeleton, skeleton3Current, skeleton1Current, skeleton2Current, bossCurrent);
    moveEnemy(boss, bossCurrent, skeleton1Current, skeleton2Current, skeleton3Current);
  }, seconds * 1000);
}
