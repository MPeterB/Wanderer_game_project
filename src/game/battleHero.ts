import { heroCurrent, Character } from './characters.ts';
import { evaluateSameTile } from './showStats.ts';
import { isStrikeSuccessful, killCharacter, battle } from './battle.ts';

export type Boolean = {
  value: boolean;
}

export const herosTurn: Boolean = {
  value: true,
}

export const counting: Boolean = {
  value: true,
};

export function heroStrikeCountdown(): void {
  const gameMessages = document.getElementById('gameMessages') as HTMLElement;
  const alerts = document.getElementById('alerts') as HTMLElement;
  let counter: number = 5;

  if (herosTurn.value === true) {
    alerts.innerHTML = '';
    const interval = setInterval(() => {
      gameMessages.innerHTML = `You have ${counter} seconds to attack the enemy!`;
      counter -= 1;
      if (counting.value === false) {
        clearInterval(interval);
        gameMessages.innerHTML = '';
        heroCurrent.lastMove = new Date;
        battle()
      }
      if (counter < 0) {
        clearInterval(interval);
        gameMessages.innerHTML = `You ran out of time. Enemy's turn`;
        heroCurrent.lastMove = new Date;
        battle()
      }
    }, 1000);
  }
}

export function heroStrike(event: KeyboardEvent): void {
  const currentEnemy: Character = evaluateSameTile().currentEnemy;
  const enemyCurrentHP = document.getElementById('enemyCurrentHP') as HTMLElement;
  const strikeIsSuccessful: [boolean, number] = isStrikeSuccessful(heroCurrent, currentEnemy);
  const strikeSuccessful: boolean = strikeIsSuccessful[0];
  const strikeValue: number = strikeIsSuccessful[1];
  const healthToDedact: number = strikeValue - currentEnemy.defensePoint;
  const gameMessages = document.getElementById('gameMessages') as HTMLElement;
  const alerts = document.getElementById('alerts') as HTMLElement;
  
  if (event.code === 'Space') {
    if (herosTurn.value === true) {
      counting.value = false;
      if (strikeSuccessful === true) {
        heroCurrent.lastMove = new Date;
        currentEnemy.currentHealth -= healthToDedact;
        enemyCurrentHP.innerHTML = `${currentEnemy.currentHealth}`;
        herosTurn.value = false;
        gameMessages.innerHTML = `You striked ${currentEnemy.name} successfully!`;
        killCharacter(currentEnemy);
      } else {
        heroCurrent.lastMove = new Date;
        gameMessages.innerHTML = `Your strike at ${currentEnemy.name} was not successful!`;
        herosTurn.value = false;
      }
    } else {
      alerts.innerHTML = 'You can not attack now! Wait for the enemy to finish their turn!';
    }
  }
}
