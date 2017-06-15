import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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
  gameId;
  questions: Question[];
  time = new Date(500, 0, 0, 1, 0, 0);

  constructor(private route: ActivatedRoute, private hostService: HostService, private router: Router, private location: Location) {
    this.preQuestionCountdown();
   }

  ngOnInit() {
    this.questions = this.hostService.getQuestions();
    this.games = this.hostService.getGames();
    this.route.params.forEach((urlParameters) => {
      this.gameId = urlParameters["id"];
    });
      this.hostService.getGameFromCode(this.gameId).subscribe(dataLastEmittedFromObserver => {
        this.currentGame = new Game
        (dataLastEmittedFromObserver.id,
        dataLastEmittedFromObserver.game_state,
        dataLastEmittedFromObserver.game_over,
        dataLastEmittedFromObserver.player_list,
        dataLastEmittedFromObserver.question_list)
      });
  }
  gameStateCountdown(){
    this.hostService.editGameState('countdown', this.currentGame);
  }

  preQuestionCountdown() {
    this.time.setSeconds(this.time.getSeconds(), -1);
    setTimeout(() => this.preQuestionCountdown(), 1000);
  }
  resetCountdown(){
    this.time = new Date(500, 0, 0, 1, 0, 0);
  }
}
