export class Question {
  constructor(public question: string, public correctAnswer: string, public wrongAnswers: string) { }
}


// how should we store wrong answers? should we just have 3 wrong answers or should we have a model of wrong answers?
