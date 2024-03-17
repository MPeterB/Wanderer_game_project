import { heroCurrent } from './characters.ts';
import { SameTileEnemy, evaluateSameTile } from './showStats.ts';
import { isStrikeSuccessful, killCharacter, battle, firstAttackHappened } from './battle.ts';

export type BooleanObject = {
  value: boolean;
};

export const herosTurn: BooleanObject = {
  value: true,
};

export const counting: BooleanObject = {
  value: true,
};

export let interval: number = 0;

export function heroStrikeCountdown(): void {
  const gameMessages = document.getElementById('gameMessages') as HTMLElement;
  const alerts = document.getElementById('alerts') as HTMLElement;
  let counter: number = 5;

  if (herosTurn.value === true) {
    alerts.innerHTML = '';
    firstAttackHappened.value = true;
    interval = setInterval(() => {
      gameMessages.innerHTML = `You have ${counter} seconds to attack the enemy!`;
      counter -= 1;
      if (counting.value === false) {
        clearInterval(interval);
        gameMessages.innerHTML = '';
        heroCurrent.lastMove = new Date();
        battle();
      }
      if (counter < 0) {
        clearInterval(interval);
        gameMessages.innerHTML = `You ran out of time. Enemy's turn`;
        heroCurrent.lastMove = new Date();
        battle();
      }
    }, 1000);
  }
}

export function heroStrike(event: KeyboardEvent): void {
  const sameTileEnemy: SameTileEnemy = evaluateSameTile();
  const enemyCurrentHP = document.getElementById('enemyCurrentHP') as HTMLElement;
  const strikeIsSuccessful: [boolean, number] = isStrikeSuccessful(heroCurrent, sameTileEnemy.currentEnemy);
  const strikeSuccessful: boolean = strikeIsSuccessful[0];
  const strikeValue: number = strikeIsSuccessful[1];
  const healthToDedact: number = strikeValue - sameTileEnemy.currentEnemy.defensePoint;
  const gameMessages = document.getElementById('gameMessages') as HTMLElement;
  const alerts = document.getElementById('alerts') as HTMLElement;

  if (heroCurrent.alive === true) {
    if(sameTileEnemy.sameTile === true) {
      if (event.code === 'Space') {
        if (herosTurn.value === true) {
          counting.value = false;
          if (strikeSuccessful === true) {
            heroCurrent.lastMove = new Date();
            sameTileEnemy.currentEnemy.currentHealth -= healthToDedact;
            enemyCurrentHP.innerHTML = `${sameTileEnemy.currentEnemy.currentHealth}`;
            gameMessages.innerHTML = `You striked ${sameTileEnemy.currentEnemy.name} successfully!`;
            killCharacter(sameTileEnemy.currentEnemy);
          } else {
            heroCurrent.lastMove = new Date();
            gameMessages.innerHTML = `Your strike at ${sameTileEnemy.currentEnemy.name} was not successful!`;
          }
          setTimeout(() => {
            battle();
          }, 2500);
        } else {
          alerts.innerHTML = 'You can not attack now! Wait for the enemy to finish their turn!';
        }
      }
    }
  }
}
