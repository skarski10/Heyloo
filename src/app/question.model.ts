export class Question {
  time: number
  student_choices: number[];
  constructor(public title: string, public instructions: string, public prompt: string, public choices: string[], public answer: number) {
    this.time = 30;
    this.student_choices = [0, 0, 0, 0];
  }
}
