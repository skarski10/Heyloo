export class Game {
  current_question: number
  constructor(public id: number, public game_state: string, public game_over: boolean, public player_list: Player[], public question_list: Question[]){
      this.current_question = 1;
  }
}
