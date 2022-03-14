import { IGame } from "./IGame";
import { Rule } from "./Rule";

export interface Context {
  gameState: IGame,
  rules: Rule[]
}