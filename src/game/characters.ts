import { randomNumberMinMax } from './enemySpawn.ts';

const heroMaxHealth = 20 + 3 * randomNumberMinMax(1, 6);
const enemy1MaxHealth = 2 * randomNumberMinMax(1, 6);
const enemy2MaxHealth = 2 * randomNumberMinMax(1, 6);
const enemy3MaxHealth = 2 * randomNumberMinMax(1, 6);
const bossMaxHealth = 2 * randomNumberMinMax(1, 6) + randomNumberMinMax(1, 6);

export type Character = {
  name: string;
  pixelX: number;
  pixelY: number;
  positionX: number;
  positionY: number;
  lastMove: Date;
  level: number;
  maxHealth: number;
  currentHealth: number;
  defensePoint: number;
  strikePoint: number;
  moving: boolean;
  alive: boolean;
};

export const heroCurrent: Character = {
  name: 'Hero',
  pixelX: 0,
  pixelY: 0,
  positionX: 0,
  positionY: 0,
  lastMove: new Date(),
  level: 1,
  maxHealth: heroMaxHealth,
  currentHealth: heroMaxHealth,
  defensePoint: 2 * randomNumberMinMax(1, 6),
  strikePoint: 5 + randomNumberMinMax(1, 6),
  moving: true,
  alive: true,
};

export const skeleton1Current: Character = {
  name: 'Skeleton',
  pixelX: 300,
  pixelY: 100,
  positionX: 6,
  positionY: 2,
  lastMove: new Date(),
  level: 1,
  maxHealth: enemy1MaxHealth,
  currentHealth: enemy1MaxHealth,
  defensePoint: 0.5 * randomNumberMinMax(1, 6),
  strikePoint: randomNumberMinMax(1, 6),
  moving: true,
  alive: true,
};

export const skeleton2Current: Character = {
  name: 'Skeleton',
  pixelX: 50,
  pixelY: 350,
  positionX: 1,
  positionY: 7,
  lastMove: new Date(),
  level: 1,
  maxHealth: enemy2MaxHealth,
  currentHealth: enemy2MaxHealth,
  defensePoint: 0.5 * randomNumberMinMax(1, 6),
  strikePoint: randomNumberMinMax(1, 6),
  moving: true,
  alive: true,
};

export const skeleton3Current: Character = {
  name: 'Skeleton',
  pixelX: 350,
  pixelY: 400,
  positionX: 7,
  positionY: 8,
  lastMove: new Date(),
  level: 1,
  maxHealth: enemy3MaxHealth,
  currentHealth: enemy3MaxHealth,
  defensePoint: 0.5 * randomNumberMinMax(1, 6),
  strikePoint: randomNumberMinMax(1, 6),
  moving: true,
  alive: true,
};

export const bossCurrent: Character = {
  name: 'Boss',
  pixelX: 200,
  pixelY: 250,
  positionX: 4,
  positionY: 5,
  lastMove: new Date(),
  level: 1,
  maxHealth: bossMaxHealth,
  currentHealth: bossMaxHealth,
  defensePoint: 0.5 * randomNumberMinMax(1, 6) + randomNumberMinMax(1, 6) / 2,
  strikePoint: randomNumberMinMax(1, 6) + 1,
  moving: true,
  alive: true,
};
