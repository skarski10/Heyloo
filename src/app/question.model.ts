export class Question {
  var time = ;
  constructor(public question: string, public correct_answer: string, public wrong_answers: string[]) { }
}


// how should we store wrong answers? should we just have 3 wrong answers or should we have a model of wrong answers?
// Add time per question
