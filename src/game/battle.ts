import { heroCurrent, Character } from './characters.ts';
import { randomNumberMinMax } from './enemySpawn.ts';
import { SameTileEnemy, evaluateSameTile, hideEnemyStats } from './showStats.ts';

let herosTurn: boolean = true;
let counting: boolean = true;
export let firstAttackHappened: boolean = false;

function firstToAttack(sameTileEnemy: Character): void {
  const heroLastMove: number = heroCurrent.lastMove.getTime();
  const enemyLastMove: number = sameTileEnemy.lastMove.getTime();

  if (heroLastMove >= enemyLastMove) {
    herosTurn = true;
  } else if (heroLastMove < enemyLastMove) {
    herosTurn = false;
  }
}

function nextToAttack(sameTileEnemy: Character): void {
  const heroLastMove: number = heroCurrent.lastMove.getTime();
  const enemyLastMove: number = sameTileEnemy.lastMove.getTime();

  if (heroLastMove >= enemyLastMove) {
    herosTurn = false;
  } else if (heroLastMove < enemyLastMove) {
    herosTurn = true;
  }
}

function isStrikeSuccessful(attacker: Character, defender: Character): [boolean, number] {
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
  const alerts = document.getElementById('alerts') as HTMLElement;
  if (character.currentHealth <= 0) {
    counting = false;
    character.alive = false;
    heroCurrent.moving = true;
    if (character.name === 'Hero') {
      alerts.innerHTML = `Game over! ${character.name} has been defeated!`;
    }
    hideEnemyStats();
    firstAttackHappened = false;
    alerts.innerHTML = `${character.name} has been defeated!`;
  }
}

function enemyStrike(currentEnemy: Character): void {
  const alerts = document.getElementById('alerts') as HTMLElement;
  const heroCurrentHP = document.getElementById('heroCurrentHP') as HTMLElement;
  const strikeIsSuccessful: [boolean, number] = isStrikeSuccessful(currentEnemy, heroCurrent);
  const strikeSuccessful: boolean = strikeIsSuccessful[0];
  const strikeValue: number = strikeIsSuccessful[1];
  const healthToDedact: number = strikeValue - heroCurrent.defensePoint;
  if (herosTurn === false) {
    if (strikeSuccessful === true) {
      currentEnemy.lastMove = new Date;
      heroCurrent.currentHealth -= healthToDedact;
      heroCurrentHP.innerHTML = `${heroCurrent.currentHealth}`;
      killCharacter(heroCurrent);
      alerts.innerHTML = `${currentEnemy.name} striked Hero successfully. Press [Space] to strike back!`;
      herosTurn = true;
      counting = true;
      heroStrikeCountdown();
    } else {
      currentEnemy.lastMove = new Date;
      alerts.innerHTML = `The strike from ${currentEnemy.name} was not successful. Press [Space] to strike back!`;
      herosTurn = true;
      counting = true;
      heroStrikeCountdown();
    }
    herosTurn = true;
    counting = true;
  }
}

export function enemyBattle(): void {
  const currentEnemy: Character = evaluateSameTile().currentEnemy;
  const sameTile: boolean = evaluateSameTile().sameTile;

  if (sameTile === true) {
    if (firstAttackHappened === false) {
      firstToAttack(currentEnemy);
      firstAttackHappened = true;
      enemyStrike(currentEnemy);
    } else {
      nextToAttack(currentEnemy);
      enemyStrike(currentEnemy);
    }
  }
}

export function heroStrikeCountdown(/*attackerWasEnemy?: string*/): void {
  const sameTileEnemy: SameTileEnemy = evaluateSameTile();
  //const sameTileEnemy: SameTileEnemy = evaluateSameTile();
  const alerts = document.getElementById('alerts') as HTMLElement;
  let counter: number = 5;
  // counting = true;
  //console.log('sametile: ' + sameTileEnemy.sameTile + ', herosturn: ' + herosTurn);
  //console.log(evaluateSameTile());
  if (sameTileEnemy.sameTile === true) {
    if (firstAttackHappened === false) {
      firstToAttack(sameTileEnemy.currentEnemy);
      firstAttackHappened = true;
    } else {
      nextToAttack(sameTileEnemy.currentEnemy);
      if (herosTurn === true) {
      //const attackerIs: string = attackerWasEnemy|| attackerDefender(sameTileEnemy.currentEnemy);
      //if (attackerIs === 'hero') {
        //console.log('sametile: ' + sameTileEnemy.sameTile + ', herosturn: ' + herosTurn);
        const interval = setInterval(() => {
          alerts.innerHTML = `You have ${counter} seconds to attack the enemy!`;
          counter -= 1;
          if (counting === false) {
            clearInterval(interval);
            alerts.innerHTML = '';
            heroCurrent.lastMove = new Date;
          }
          if (counter < 0) {
            clearInterval(interval);
            alerts.innerHTML = `You ran out of time. Enemy's turn`;
            //herosTurn = false;
            heroCurrent.lastMove = new Date;
            //enemyBattle(/*'enemy'*/);
            //enemyStrike(sameTileEnemy.currentEnemy)
          }
        }, 1000);
      }
      //enemyStrike(/*'enemy'*/);
    }
  }
}

export function heroStrike(event: KeyboardEvent): void {
  const currentEnemy: Character = evaluateSameTile().currentEnemy;
  const sameTile: boolean = evaluateSameTile().sameTile;
  const enemyCurrentHP = document.getElementById('enemyCurrentHP') as HTMLElement;
  const strikeSuccessful: boolean = isStrikeSuccessful(heroCurrent, currentEnemy)[0];
  const strikeValue: number = isStrikeSuccessful(heroCurrent, currentEnemy)[1];
  const healthToDedact: number = strikeValue - currentEnemy.defensePoint;
  const alerts = document.getElementById('alerts') as HTMLElement;
  //let attackerIs: string = '';
  
  if (sameTile === true) {
    if (firstAttackHappened === false) {
      firstToAttack(currentEnemy);
      firstAttackHappened = true;
    } else {
      nextToAttack(currentEnemy);
      if (herosTurn === true) {
    //console.log('bla')
    //attackerIs = 'hero';

    /*if (herosTurn === true) {
      attackerIs = 'hero';
    }*/
    //if (herosTurn === true) {  
      //console.log('the attacker is:' + attackerIs)   
        heroStrikeCountdown();
        if (event.code === 'Space') {
          counting = false;
          heroStrikeCountdown();
          if (strikeSuccessful === true) {
            heroCurrent.lastMove = new Date;
            currentEnemy.currentHealth -= healthToDedact;
            enemyCurrentHP.innerHTML = `${currentEnemy.currentHealth}`;
            herosTurn = false;
            alerts.innerHTML = `You striked ${currentEnemy.name} successfully!`;
            killCharacter(currentEnemy);
          //heroCurrent.moving = true;
          //console.log(healthToDedact)
          }
          alerts.innerHTML = `Your strike at ${currentEnemy.name} was not successful!`;
        }
      }
      /*if (event.code === 'Space') {
        alerts.innerHTML = 'Not your turn!';
      }*/
    }
  }
} 
