import {
  heroCurrent,
  skeleton1Current,
  skeleton2Current,
  skeleton3Current,
  bossCurrent,
  Character,
} from './characters.ts';

export function showHeroStats(): void {
  const heroLevel = document.getElementById('heroLevel') as HTMLElement;
  const heroCurrentHP = document.getElementById('heroCurrentHP') as HTMLElement;
  const heroMaxHP = document.getElementById('heroMaxHP') as HTMLElement;
  const heroDefenseP = document.getElementById('heroDefenseP') as HTMLElement;
  const heroStrikeP = document.getElementById('heroStrikeP') as HTMLElement;

  heroLevel.innerHTML = `${heroCurrent.level}`;
  heroCurrentHP.innerHTML = `${heroCurrent.currentHealth}`;
  heroMaxHP.innerHTML = `${heroCurrent.maxHealth}`;
  heroDefenseP.innerHTML = `${heroCurrent.defensePoint}`;
  heroStrikeP.innerHTML = `${heroCurrent.strikePoint}`;
}

export type SameTileEnemy = {
  sameTile: boolean;
  currentEnemy: Character;
};

export function evaluateSameTile(): SameTileEnemy {
  const sameTileEnemy: SameTileEnemy = {
    sameTile: false,
    currentEnemy: {} as Character,
  };
  if (heroCurrent.positionX === skeleton1Current.positionX && heroCurrent.positionY === skeleton1Current.positionY) {
    sameTileEnemy.currentEnemy = skeleton1Current;
    sameTileEnemy.sameTile = true;
  } else if (heroCurrent.positionX === skeleton2Current.positionX && heroCurrent.positionY === skeleton2Current.positionY) {
    sameTileEnemy.currentEnemy = skeleton2Current;
    sameTileEnemy.sameTile = true;
  } else if (heroCurrent.positionX === skeleton3Current.positionX && heroCurrent.positionY === skeleton3Current.positionY) {
    sameTileEnemy.currentEnemy = skeleton3Current;
    sameTileEnemy.sameTile = true;
  } else if (heroCurrent.positionX === bossCurrent.positionX && heroCurrent.positionY === bossCurrent.positionY) {
    sameTileEnemy.currentEnemy = bossCurrent;
    sameTileEnemy.sameTile = true;
  } else {
    sameTileEnemy.sameTile = false;
  }
  return sameTileEnemy;
}

export function showEnemyStats(): void {
  const sameTileEnemy: SameTileEnemy = evaluateSameTile();
  const enemyStats = document.getElementById('enemyStats') as HTMLElement;
  const enemyName = document.getElementById('enemyName') as HTMLElement;
  const enemyLevel = document.getElementById('enemyLevel') as HTMLElement;
  const enemyCurrentHP = document.getElementById('enemyCurrentHP') as HTMLElement;
  const enemyMaxHP = document.getElementById('enemyMaxHP') as HTMLElement;
  const enemyDefenseP = document.getElementById('enemyDefenseP') as HTMLElement;
  const enemyStrikeP = document.getElementById('enemyStrikeP') as HTMLElement;
  let enemyCurrent = {} as Character;

  if (sameTileEnemy.sameTile === true) {
    enemyCurrent = sameTileEnemy.currentEnemy;
    if (enemyCurrent.alive === true) {
      if (enemyStats.style.display === 'none') {
        enemyName.innerHTML = `${enemyCurrent.name}`;
        enemyLevel.innerHTML = `${enemyCurrent.level}`;
        enemyCurrentHP.innerHTML = `${enemyCurrent.currentHealth}`;
        enemyMaxHP.innerHTML = `${enemyCurrent.maxHealth}`;
        enemyDefenseP.innerHTML = `${enemyCurrent.defensePoint}`;
        enemyStrikeP.innerHTML = `${enemyCurrent.strikePoint}`;
        enemyStats.style.display = 'flex';
      }
    } else {
      enemyStats.style.display = 'none'
    }
  } else {
    enemyStats.style.display = 'none';
  }
}

export function hideEnemyStats(): void {
  const enemyStats = document.getElementById('enemyStats') as HTMLElement;
  enemyStats.style.display = 'none';
}
