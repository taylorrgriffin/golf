import { Game } from "./Game";
import { Rule } from "./Rule";

export interface Context {
  gameState: Game,
  rules: Rule[]
}