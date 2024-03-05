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

type SameTileEnemy = {
  sameTile: boolean;
  currentEnemy: Character;
};

export function evaluateSameTile(
  enemy1: Character,
  enemy2: Character,
  enemy3: Character,
  enemy4: Character,
): SameTileEnemy {
  const sameTileEnemy: SameTileEnemy = {
    sameTile: false,
    currentEnemy: {} as Character,
  };
  if (heroCurrent.positionX === enemy1.positionX && heroCurrent.positionY === enemy1.positionY) {
    sameTileEnemy.currentEnemy = enemy1;
    sameTileEnemy.sameTile = true;
    enemy1.moving = false;
  } else if (heroCurrent.positionX === enemy2.positionX && heroCurrent.positionY === enemy2.positionY) {
    sameTileEnemy.currentEnemy = enemy2;
    sameTileEnemy.sameTile = true;
    enemy2.moving = false;
  } else if (heroCurrent.positionX === enemy3.positionX && heroCurrent.positionY === enemy3.positionY) {
    sameTileEnemy.currentEnemy = enemy3;
    sameTileEnemy.sameTile = true;
    enemy3.moving = false;
  } else if (heroCurrent.positionX === enemy4.positionX && heroCurrent.positionY === enemy4.positionY) {
    sameTileEnemy.currentEnemy = enemy4;
    sameTileEnemy.sameTile = true;
    enemy4.moving = false;
  } else {
    sameTileEnemy.sameTile = false;
    enemy1.moving = true;
    enemy2.moving = true;
    enemy3.moving = true;
    enemy4.moving = true;
  }
  return sameTileEnemy;
}

export function showEnemyStats(): void {
  const sameTileEnemy: SameTileEnemy = evaluateSameTile(
    skeleton1Current,
    skeleton2Current,
    skeleton3Current,
    bossCurrent,
  );
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
    if (enemyStats.style.display === 'none') {
      enemyName.innerHTML = `${enemyCurrent.name}`;
      enemyLevel.innerHTML = `${enemyCurrent.level}`;
      enemyCurrentHP.innerHTML = `${enemyCurrent.currentHealth}`;
      enemyMaxHP.innerHTML = `${enemyCurrent.maxHealth}`;
      enemyDefenseP.innerHTML = `${enemyCurrent.defensePoint}`;
      enemyStrikeP.innerHTML = `${enemyCurrent.strikePoint}`;
      enemyStats.style.display = 'flex';
    } else {
      enemyStats.style.display = 'none';
    }
  } else {
    enemyStats.style.display = 'none';
  }
}
