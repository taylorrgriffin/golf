import { IHand } from '../intefaces/IHand';
import { Column } from './Column';

export class Hand implements IHand {
  columns: Column[];
  
  constructor(columns: Column[]) {
    this.columns = columns;
  }

  clearMatchedRows(columns: Column[]) {
    let pointsToSubtract = 0;

    columns.forEach((column) => {
      if (!column.isCleared) {
        let isCleared = column.isFullyFaceUp() && column.isMatched();
        if (isCleared) {
          column.clear();
          if (column.isMatchedSuits()) {
            pointsToSubtract = 10;
          }
        }
      }
    });

    return pointsToSubtract;
  }
}