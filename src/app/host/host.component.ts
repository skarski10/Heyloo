import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { HostService} from '../host.service';
import { Question } from '../question.model';
import { Game } from '../game.model';


@Component({
  selector: 'host-component',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  providers: [HostService]
})
export class HostComponent {
  games: FirebaseListObservable<any[]>;
  currentGame;
  questions;
  students:any[] = ["kory", "melvin", "scott", "loren"];

  constructor(private hostService: HostService) { }

  ngOnInit() {
    this.questions = this.hostService.getQuestions();
    this.games = this.hostService.getGames();
    console.log(this.questions);
  }

  randomId(){
    return Math.floor(Math.random()*90000) + 10000;
  }

  startGame(){
    console.log(this.questions);
    var newGame: Game = new Game(this.randomId(), "starting", false, this.students, this.questions);
    this.hostService.createGame(newGame);
  }
}
