import { heroCurrent, bossCurrent, Character } from './characters.ts';
import { BooleanObject, randomNumberMinMax, winLevel } from './game.ts';
import { SameTileEnemy, evaluateSameTile, hideEnemyStats } from './showStats.ts';
import { herosTurn, counting, heroStrikeCountdown, interval } from './battleHero.ts';
import { enemyStrike } from './battleEnemy.ts';

export const firstAttackHappened: BooleanObject = {
  value: false,
};

function firstToAttack(sameTileEnemy: Character): void {
  const heroLastMove: number = heroCurrent.lastMove.getTime();
  const enemyLastMove: number = sameTileEnemy.lastMove.getTime();

  if (heroLastMove >= enemyLastMove) {
    herosTurn.value = true;
  } else if (heroLastMove < enemyLastMove) {
    herosTurn.value = false;
  }
}

function nextToAttack(sameTileEnemy: Character): void {
  const heroLastMove: number = heroCurrent.lastMove.getTime();
  const enemyLastMove: number = sameTileEnemy.lastMove.getTime();

  if (heroLastMove >= enemyLastMove) {
    herosTurn.value = false;
  } else if (heroLastMove < enemyLastMove) {
    herosTurn.value = true;
  }
}

export function isStrikeSuccessful(attacker: Character, defender: Character): [boolean, number] {
  let strikeSuccessful: boolean = false;
  const strikeValue: number = attacker.strikePoint + 2 * randomNumberMinMax(1, 6);

  if (strikeValue > defender.defensePoint) {
    strikeSuccessful = true;
  } else {
    strikeSuccessful = false;
  }
  return [strikeSuccessful, strikeValue];
}

export function killCharacter(
  characterToKill: Character, 
  killingCharacter: Character,
): void {
  const gameMessages = document.getElementById('gameMessages') as HTMLElement;
  const gameOverScreen = document.getElementById('gameOverScreen') as HTMLElement;
  const alertBox = document.getElementById('alertBox') as HTMLElement;
  const statsContainer = document.getElementById('stats-container') as HTMLElement;
  const heroKillerName = document.getElementById('heroKillerName') as HTMLElement;
  const heroLevel = document.getElementById('heroLevel') as HTMLElement;
  const heroMaxHP = document.getElementById('heroMaxHP') as HTMLElement;
  const heroDefenseP = document.getElementById('heroDefenseP') as HTMLElement;
  const heroStrikeP = document.getElementById('heroStrikeP') as HTMLElement;

  counting.value = false;
  clearInterval(interval);

  if (characterToKill.currentHealth <= 0) {
    counting.value = true;
    characterToKill.alive = false;
    heroCurrent.moving = true;
    firstAttackHappened.value = false;
    if (characterToKill.name === 'Hero') {
      heroCurrent.moving = false;
      gameMessages.innerHTML = `${killingCharacter.name} striked Hero successfully.`;
      setTimeout(() => {
        gameMessages.innerHTML = `Game over! The Hero died!`;
      }, 2000);
      setTimeout(() => {
        heroKillerName.innerHTML = `${killingCharacter.name}`;
        gameOverScreen.style.display = 'block';
        alertBox.style.display = 'none';
        statsContainer.style.display = 'none';
      }, 4000);
    } else {
      hideEnemyStats();
      heroCurrent.level += 1;
      heroCurrent.maxHealth += randomNumberMinMax(1, 6);
      heroCurrent.defensePoint += randomNumberMinMax(1, 6);
      heroCurrent.strikePoint += randomNumberMinMax(1, 6);
      heroLevel.innerHTML = `${heroCurrent.level}`;
      heroMaxHP.innerHTML = `${heroCurrent.maxHealth}`;
      heroDefenseP.innerHTML = `${heroCurrent.defensePoint}`;
      heroStrikeP.innerHTML = `${heroCurrent.strikePoint}`;
      
      gameMessages.innerHTML = `${characterToKill.name} has been defeated! Hero gained a level.`;
      
      function heroTakesKey(): void {
        if (characterToKill.hasKey === true) {
          characterToKill.hasKey = false;
          heroCurrent.hasKey = true;
        }
      }

      setTimeout(() => {
        if (characterToKill.hasKey === false && characterToKill.name === 'Skeleton') {
          gameMessages.innerHTML = `No key was found on this Skeleton. Keep looking!`;
        }
        if (heroCurrent.hasKey === false && characterToKill.name === 'Boss') {
          gameMessages.innerHTML = 
          'You have killed the Boss, ' +
          'but to win the level you have to get the key from one of the Skeletons first!';
        }
        if (characterToKill.hasKey === true && bossCurrent.alive === true) {
          heroTakesKey();
          gameMessages.innerHTML =
            'You have acquired the key to the next level. ' +
            'To be able to use it, you have to kill the Boss first!';
        }
        if (characterToKill.hasKey === true && bossCurrent.alive === false) {
          heroTakesKey();
          winLevel();
          gameMessages.innerHTML =
            'You have acquired the key to the next level, and the Boss is dead. ' +
            'You have won this level. Use the key you ackquired to enter the next one!';
        }
        if (heroCurrent.hasKey === true && characterToKill.name === 'Boss') {
          winLevel();
          gameMessages.innerHTML = 
            'You have killed the Boss while holding the key to the next level. ' +
            'You have won this level. Use the key you ackquired to enter the next one!';
        }
      }, 2500);
    }
  } else {
    firstAttackHappened.value = true;
  }
}

export function battle(): void {
  if (heroCurrent.alive === true) {
    const sameTileEnemy: SameTileEnemy = evaluateSameTile();
    if (sameTileEnemy.sameTile === true && sameTileEnemy.currentEnemy.alive === true) {
      if (firstAttackHappened.value === false) {
        firstToAttack(sameTileEnemy.currentEnemy);
        if (herosTurn.value === false) {
          enemyStrike(sameTileEnemy.currentEnemy);
        } else {
          heroStrikeCountdown();
        }
        firstAttackHappened.value = true;
      } else if (firstAttackHappened.value === true) {
        nextToAttack(sameTileEnemy.currentEnemy);
        if (herosTurn.value === false) {
          enemyStrike(sameTileEnemy.currentEnemy);
        } else {
          heroStrikeCountdown();
        }
      }
    }
  }
}
