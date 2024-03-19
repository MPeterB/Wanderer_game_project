import { heroCurrent, Character } from './characters.ts';
import { isStrikeSuccessful, killCharacter, battle } from './battle.ts';
import { herosTurn, counting } from './battleHero.ts';

export function enemyStrike(currentEnemy: Character): void {
  const gameMessages = document.getElementById('gameMessages') as HTMLElement;
  const heroCurrentHP = document.getElementById('heroCurrentHP') as HTMLElement;
  const strikeIsSuccessful: [boolean, number] = isStrikeSuccessful(currentEnemy, heroCurrent);
  const strikeSuccessful: boolean = strikeIsSuccessful[0];
  const strikeValue: number = strikeIsSuccessful[1];
  const healthToDedact: number = strikeValue - heroCurrent.defensePoint;

  if (herosTurn.value === false) {
    gameMessages.innerHTML = `${currentEnemy.name} is attacking now.`;
    setTimeout(() => {
      if (strikeSuccessful === true) {
        currentEnemy.lastMove = new Date();
        const newHealth: number = (heroCurrent.currentHealth -= healthToDedact);
        if (newHealth < 0) {
          heroCurrent.currentHealth = 0;
        } else {
          heroCurrent.currentHealth = newHealth;
        }
        heroCurrentHP.innerHTML = `${heroCurrent.currentHealth}`;
        gameMessages.innerHTML = `${currentEnemy.name} striked Hero successfully. Get ready to attack!`;
        killCharacter(heroCurrent, currentEnemy);
        setTimeout(() => {
          herosTurn.value = true;
          counting.value = true;
          battle();
        }, 2500);
      } else {
        currentEnemy.lastMove = new Date();
        gameMessages.innerHTML = `The strike from ${currentEnemy.name} was not successful. Get ready to attack!`;
        setTimeout(() => {
          herosTurn.value = true;
          counting.value = true;
          battle();
        }, 2500);
      }
    }, 2500);
  }
}
