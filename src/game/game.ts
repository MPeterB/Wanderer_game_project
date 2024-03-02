import { moveEnemies } from './enemy.ts';

type GameProgress = {
  inProgress: boolean;
};

export const gameProgress: GameProgress = {
  inProgress: false,
};

export function startGame() {
  moveEnemies();
}
