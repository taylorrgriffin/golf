import { IHand } from '../intefaces/IHand';
import { Column } from './Column';

export class Hand implements IHand {
  columns: Column[];
  
  constructor(columns: Column[]) {
    this.columns = columns;
  }
}