import { IGame } from "./Game";
import { Rule } from "./Rule";

export interface Context {
  gameState: IGame,
  rules: Rule[]
}