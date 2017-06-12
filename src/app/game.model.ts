import { Player } from './player.model';
import { Question } from './question.model';
export class Game {
  current_question: number
  countdown: number
  question_timer: number
  constructor(public id: number, public game_state: string, public game_over: boolean, public player_list: Player[], public question_list: Question[]){
      this.current_question = 1;
      this.countdown = 5;
      this.question_timer = 30;
  }
}
