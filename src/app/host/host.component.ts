import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  currentGame: Game;
  gameId: number;
  questions;
  students:any[] = ["kory", "melvin", "scott", "loren"];
  currentRoute: string = this.router.url;

  constructor(private route: ActivatedRoute, private hostService: HostService, private router: Router, private location: Location) { }

  ngOnInit() {
    // this.questions = this.hostService.getQuestions();
    this.games = this.hostService.getGames();
    this.route.params.forEach((urlParameters) => {
      this.gameId = urlParameters["id"];
    });
      this.hostService.getGame(this.gameId).subscribe(dataLastEmittedFromObserver => {
        this.currentGame = new Game
        (dataLastEmittedFromObserver.id,
        dataLastEmittedFromObserver.game_state,
        dataLastEmittedFromObserver.game_over,
        dataLastEmittedFromObserver.player_list,
        dataLastEmittedFromObserver.question_list)
      })
      console.log(this.currentGame);
  }

  randomId(){
    return Math.floor(Math.random()*90000) + 10000;
  }

  beginGame(){
    var newGame: Game = new Game(this.randomId(), "starting", false, this.students, this.questions);
    this.hostService.createGame(newGame);
  }
}
