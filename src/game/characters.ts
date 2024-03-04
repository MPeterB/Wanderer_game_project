import { randomNumberMinMax } from './enemySpawn.ts';

const heroMaxHealth = 20 + 3 * randomNumberMinMax(1, 6);
const enemy1MaxHealth = 2 * randomNumberMinMax(1, 6);
const enemy2MaxHealth = 2 * randomNumberMinMax(1, 6);
const enemy3MaxHealth = 2 * randomNumberMinMax(1, 6);
const bossMaxHealth = 2 * randomNumberMinMax(1, 6) + randomNumberMinMax(1, 6);

export type Character = {
  pixelX: number;
  pixelY: number;
  positionX: number;
  positionY: number;
  level: number;
  maxHealth: number;
  currentHealth: number;
  defensePoint: number;
  strikePoint: number;
};

export const heroCurrent: Character = {
  pixelX: 0,
  pixelY: 0,
  positionX: 0,
  positionY: 0,
  level: 1,
  maxHealth: heroMaxHealth,
  currentHealth: heroMaxHealth,
  defensePoint: 2 * randomNumberMinMax(1, 6),
  strikePoint: 5 + randomNumberMinMax(1, 6),
};

export const skeleton1Current: Character = {
  pixelX: 300,
  pixelY: 100,
  positionX: 6,
  positionY: 2,
  level: 1,
  maxHealth: enemy1MaxHealth,
  currentHealth: enemy1MaxHealth,
  defensePoint: 0.5 * randomNumberMinMax(1, 6),
  strikePoint: randomNumberMinMax(1, 6),
};

export const skeleton2Current: Character = {
  pixelX: 50,
  pixelY: 350,
  positionX: 1,
  positionY: 7,
  level: 1,
  maxHealth: enemy2MaxHealth,
  currentHealth: enemy2MaxHealth,
  defensePoint: 0.5 * randomNumberMinMax(1, 6),
  strikePoint: randomNumberMinMax(1, 6),
};

export const skeleton3Current: Character = {
  pixelX: 350,
  pixelY: 400,
  positionX: 7,
  positionY: 8,
  level: 1,
  maxHealth: enemy3MaxHealth,
  currentHealth: enemy3MaxHealth,
  defensePoint: 0.5 * randomNumberMinMax(1, 6),
  strikePoint: randomNumberMinMax(1, 6),
};

export const bossCurrent: Character = {
  pixelX: 200,
  pixelY: 250,
  positionX: 4,
  positionY: 5,
  level: 1,
  maxHealth: bossMaxHealth,
  currentHealth: bossMaxHealth,
  defensePoint: 0.5 * randomNumberMinMax(1, 6) + randomNumberMinMax(1, 6) / 2,
  strikePoint: randomNumberMinMax(1, 6) + 1,
};
