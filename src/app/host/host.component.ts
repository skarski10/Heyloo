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
  subGame: FirebaseObjectObservable<any[]>;
  currentGame;
  gameId;
  questions: Question[];
  time: number = 0;

  constructor(private route: ActivatedRoute, private hostService: HostService, private router: Router, private location: Location) {
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
      this.subGame = this.hostService.getGameFromCode(this.currentGame.id);
  }
  gameStateCountdown(){
    this.hostService.editGameState('countdown', this.currentGame);
    this.fiveSeconds();
  }

  gameStateQuestion(){
    this.hostService.editGameState('question', this.currentGame);
    this.thirtySeconds();
  }

  gameStateAnswer(){
    this.hostService.editGameState('answer', this.currentGame);
  }

  gameStateLeaderboard(){
    this.hostService.editGameState('leaderboard', this.currentGame);
  }

  fiveSeconds(){
    this.time = 5;
    var interval = setInterval(data => {
      if(this.time != 0){
      console.log(this.time);
        this.time --;
      }
      else {
        console.log("done");
        clearInterval(interval);
        this.gameStateQuestion();
      }
    }, 1000);
  }

  thirtySeconds(){
    this.time = 30;
    console.log(this.time);
    var interval = setInterval(data => {
      console.log(this.time);
      if(this.time != 0){
        this.time --;
      }
      else {
        clearInterval(interval);
        this.gameStateAnswer();
      }
    }, 1000);
  }

  // preQuestionCountdown() {
  //   this.time.setSeconds(this.time.getSeconds(), -1);
  //   setTimeout(() => this.preQuestionCountdown(), 1000);
  // }
  // resetCountdown(){
  //   this.time = new Date(250, 0, 0, 0, 30, 0);
  // }
}
