import {
  heroCurrent,
  skeleton1Current,
  skeleton2Current,
  skeleton3Current,
  bossCurrent,
  Character,
} from './characters.ts';
import { randomNumberMinMax } from './enemySpawn.ts';
import { SameTileEnemy, evaluateSameTile, hideEnemyStats } from './showStats.ts';
import { herosTurn, counting, heroStrikeCountdown, BooleanObject, interval } from './battleHero.ts';
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

export function killCharacter(character: Character): void {
  const gameMessages = document.getElementById('gameMessages') as HTMLElement;

  counting.value = false;
  clearInterval(interval);

  if (character.currentHealth <= 0) {
    counting.value = true;
    character.alive = false;
    heroCurrent.moving = true;
    firstAttackHappened.value = false;
    if (character.name === 'Hero') {
      heroCurrent.moving = false;
      skeleton1Current.moving = false;
      skeleton2Current.moving = false;
      skeleton3Current.moving = false;
      bossCurrent.moving = false;
      heroCurrent.alive = false;
      gameMessages.innerHTML = `Game over! The Hero died!`;
    } else {
      hideEnemyStats();
      gameMessages.innerHTML = `${character.name} has been defeated!`;
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
