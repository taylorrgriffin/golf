import { IGame } from "../intefaces/IGame";
import { Rule } from "./Rule";

export interface Context {
  gameState: IGame,
  rules: Rule[]
}