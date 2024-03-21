import { heroCurrent } from './characters.ts';
import { map } from './map.ts';
import { wall } from './tiles.ts';
import { gameInProgress, startGame, wonLevel } from './game.ts';
import { SameTileEnemy, evaluateSameTile, showEnemyStats } from './showStats.ts';
import { battle, firstAttackHappened } from './battle.ts';

const canvasH = document.querySelector('.hero-canvas') as HTMLCanvasElement;
export const ctxH = canvasH.getContext('2d') as CanvasRenderingContext2D;

export const heroDown = document.getElementById('hero-down') as HTMLImageElement;
const heroUp = document.getElementById('hero-up') as HTMLImageElement;
const heroRight = document.getElementById('hero-right') as HTMLImageElement;
const heroLeft = document.getElementById('hero-left') as HTMLImageElement;
const alerts = document.getElementById('alerts') as HTMLElement;
const gameMessages = document.getElementById('gameMessages') as HTMLElement;

export function heroMove(event: KeyboardEvent): void {
  if (heroCurrent.alive === true && wonLevel.value === false) {
    switch (event.code) {
      case 'ArrowDown':
      case 'KeyS':
        if (heroCurrent.moving === false) {
          alerts.innerHTML = `You are currently in battle. You can not move while in battle!`;
        } else {
          ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
          alerts.innerHTML = '';
          gameMessages.innerHTML = '';
          heroCurrent.lastMove = new Date();
          firstAttackHappened.value = false;
          if (gameInProgress.value === false) {
            startGame();
            gameInProgress.value = true;
          }
          if (
            heroCurrent.pixelY === canvasH.height - 50 ||
            map[heroCurrent.positionY + 1][heroCurrent.positionX] === wall
          ) {
            ctxH.drawImage(heroDown, heroCurrent.pixelX, heroCurrent.pixelY, 50, 50);
          } else {
            ctxH.drawImage(heroDown, heroCurrent.pixelX, heroCurrent.pixelY + 50, 50, 50);
            heroCurrent.pixelY += 50;
            heroCurrent.positionY += 1;
            const sameTileEnemy: SameTileEnemy = evaluateSameTile();
            if (sameTileEnemy.sameTile === true && sameTileEnemy.currentEnemy.alive === true) {
              if (
                heroCurrent.positionX === sameTileEnemy.currentEnemy.positionX &&
                heroCurrent.positionY === sameTileEnemy.currentEnemy.positionY
              ) {
                heroCurrent.moving = false;
                sameTileEnemy.currentEnemy.moving = false;
              }
            }
            sameTileEnemy.sameTile = false;
            showEnemyStats();
            battle();
          }
        }
        break;
      case 'ArrowUp':
      case 'KeyW':
        if (heroCurrent.moving === false) {
          alerts.innerHTML = `You are currently in battle. You can not move while in battle!`;
        } else {
          ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
          alerts.innerHTML = '';
          gameMessages.innerHTML = '';
          heroCurrent.lastMove = new Date();
          firstAttackHappened.value = false;
          if (gameInProgress.value === false) {
            startGame();
            gameInProgress.value = true;
          }
          if (heroCurrent.pixelY === 0 || map[heroCurrent.positionY - 1][heroCurrent.positionX] === wall) {
            ctxH.drawImage(heroUp, heroCurrent.pixelX, heroCurrent.pixelY, 50, 50);
          } else {
            ctxH.drawImage(heroUp, heroCurrent.pixelX, heroCurrent.pixelY - 50, 50, 50);
            heroCurrent.pixelY -= 50;
            heroCurrent.positionY -= 1;
            const sameTileEnemy: SameTileEnemy = evaluateSameTile();
            if (sameTileEnemy.sameTile === true && sameTileEnemy.currentEnemy.alive === true) {
              if (
                heroCurrent.positionX === sameTileEnemy.currentEnemy.positionX &&
                heroCurrent.positionY === sameTileEnemy.currentEnemy.positionY
              ) {
                heroCurrent.moving = false;
                sameTileEnemy.currentEnemy.moving = false;
              }
            }
            sameTileEnemy.sameTile = false;
            showEnemyStats();
            battle();
          }
        }
        break;
      case 'ArrowRight':
      case 'KeyD':
        if (heroCurrent.moving === false) {
          alerts.innerHTML = `You are currently in battle. You can not move while in battle!`;
        } else {
          ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
          alerts.innerHTML = '';
          gameMessages.innerHTML = '';
          heroCurrent.lastMove = new Date();
          firstAttackHappened.value = false;
          if (gameInProgress.value === false) {
            startGame();
            gameInProgress.value = true;
          }
          if (
            heroCurrent.pixelX === canvasH.width - 50 ||
            map[heroCurrent.positionY][heroCurrent.positionX + 1] === wall
          ) {
            ctxH.drawImage(heroRight, heroCurrent.pixelX, heroCurrent.pixelY, 50, 50);
          } else {
            ctxH.drawImage(heroRight, heroCurrent.pixelX + 50, heroCurrent.pixelY, 50, 50);
            heroCurrent.pixelX += 50;
            heroCurrent.positionX += 1;
            const sameTileEnemy: SameTileEnemy = evaluateSameTile();
            if (sameTileEnemy.sameTile === true && sameTileEnemy.currentEnemy.alive === true) {
              if (
                heroCurrent.positionX === sameTileEnemy.currentEnemy.positionX &&
                heroCurrent.positionY === sameTileEnemy.currentEnemy.positionY
              ) {
                heroCurrent.moving = false;
                sameTileEnemy.currentEnemy.moving = false;
              }
            }
            sameTileEnemy.sameTile = false;
            showEnemyStats();
            battle();
          }
        }
        break;
      case 'ArrowLeft':
      case 'KeyA':
        if (heroCurrent.moving === false) {
          alerts.innerHTML = `You are currently in battle. You can not move while in battle!`;
        } else {
          ctxH.clearRect(0, 0, canvasH.width, canvasH.height);
          alerts.innerHTML = '';
          gameMessages.innerHTML = '';
          heroCurrent.lastMove = new Date();
          firstAttackHappened.value = false;
          if (gameInProgress.value === false) {
            startGame();
            gameInProgress.value = true;
          }
          if (heroCurrent.pixelX === 0 || map[heroCurrent.positionY][heroCurrent.positionX - 1] === wall) {
            ctxH.drawImage(heroLeft, heroCurrent.pixelX, heroCurrent.pixelY, 50, 50);
          } else {
            ctxH.drawImage(heroLeft, heroCurrent.pixelX - 50, heroCurrent.pixelY, 50, 50);
            heroCurrent.pixelX -= 50;
            heroCurrent.positionX -= 1;
            const sameTileEnemy: SameTileEnemy = evaluateSameTile();
            if (sameTileEnemy.sameTile === true && sameTileEnemy.currentEnemy.alive === true) {
              if (
                heroCurrent.positionX === sameTileEnemy.currentEnemy.positionX &&
                heroCurrent.positionY === sameTileEnemy.currentEnemy.positionY
              ) {
                heroCurrent.moving = false;
                sameTileEnemy.currentEnemy.moving = false;
              }
            }
            sameTileEnemy.sameTile = false;
            showEnemyStats();
            battle();
          }
        }
        break;
      case 'Space':
        const sameTileEnemy: SameTileEnemy = evaluateSameTile();
        if (sameTileEnemy.sameTile === false) {
          alerts.innerHTML = 'You can strike only if you are on the same tile as an enemy!';
        }
        break;
      default:
        alerts.innerHTML = 'Only arrow buttons and WASD are acceptable to move your hero!';
    }
  }
}
