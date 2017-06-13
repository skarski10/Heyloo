export class Question {
  time: number
  constructor(public title: string, public instructions: string, public prompt: string, public choices: string[], public answer: number) {
    this.time = 30;
  }
}
