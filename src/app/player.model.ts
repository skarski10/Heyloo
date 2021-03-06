export class Player {
  public ratio: number = 0;
  public points: number;
  constructor(public name: string, public correct: number, public wrong: number, public id: number){
    if(correct != 0 && wrong != 0){
      this.ratio = (correct/wrong);
    }
    else if(correct > 0 && wrong === 0){
      this.ratio = 1;
    }
    else {
      this.ratio = 0;
    }
    this.points = 0;
  }
}
