export class Player {
  public ratio: number;
  constructor(public name: string, public correct: number, public wrong: number){
    this.ratio = (this.correct / this.wrong);
  }
}

// should we add a player score?
// what about player id?
