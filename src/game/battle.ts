import {
  skeleton1Current,
  skeleton2Current,
  skeleton3Current,
  bossCurrent,
  heroCurrent,
} from './characters.ts';
import { randomNumberMinMax } from './enemySpawn.ts';
import { evaluateSameTile, SameTileEnemy } from './showStats.ts';

function isStrikeSuccessful(): [boolean, SameTileEnemy, number] {
  const sameTileEnemy: SameTileEnemy = evaluateSameTile(
    skeleton1Current,
    skeleton2Current,
    skeleton3Current,
    bossCurrent,
  );
  let strikeSuccessful: boolean = false;

  const strikeValue: number = heroCurrent.strikePoint + 2 * randomNumberMinMax(1, 6);

  if (strikeValue > sameTileEnemy.currentEnemy.defensePoint) {
    strikeSuccessful = true;
  }
  return [strikeSuccessful, sameTileEnemy, strikeValue];
}

export function strike(): void {
  const strikeSuccessful: boolean = isStrikeSuccessful()[0];
  const sameTileEnemy: SameTileEnemy = isStrikeSuccessful()[1];
  const strikeValue: number = isStrikeSuccessful()[2];
  const healthToDedact: number = strikeValue - sameTileEnemy.currentEnemy.defensePoint;
  const enemyCurrentHP = document.getElementById('enemyCurrentHP') as HTMLElement;
  
  if (strikeSuccessful === true) {
    sameTileEnemy.currentEnemy.currentHealth -= healthToDedact
    enemyCurrentHP.innerHTML = `${sameTileEnemy.currentEnemy.currentHealth}`;
  }
}
