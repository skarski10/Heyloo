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
  playerList: FirebaseListObservable<any[]>;
  gameId;
  currentGame;
  questions: Question[];
  currentQuestion;
  currentQuestionIndex: number = 0;
  time: number = 0;

  constructor(private route: ActivatedRoute, private hostService: HostService, private router: Router, private location: Location) {
   }

  ngOnInit() {
    var gameKey;
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
      this.getPlayerList(this.currentGame.id);
      // this.route.params.forEach(urlParameters => {
      //   this.currentGame = this.hostService.getGameFromCode(urlParameters['id']);
      // })
      this.subGame.subscribe(data => {
        gameKey = data['$key'];
        // console.log(data);
      })
      this.currentQuestion = this.hostService.getQuestionKeyAndId(gameKey, this.currentGame.current_question);
      // console.log(this.currentQuestion);
  }

  getPlayerList(gameId: number){
    this.subGame = this.hostService.getGameFromCode(gameId);
    this.subGame.subscribe(data=>{
    this.playerList = this.hostService.getCurrentGamePlayerList(data["$key"]);
  })
  return this.playerList;
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
    this.currentQuestionIndex ++;
  }

  fiveSeconds(){
    this.time = 5;
    var interval = setInterval(data => {
      if(this.time != 0){
      // console.log(this.time);
        this.time --;
      }
      else {
        clearInterval(interval);
        this.gameStateQuestion();
        // this.hostService.getQuestion();
      }
    }, 1000);
  }

  thirtySeconds(){
    this.time = 30;
    var interval = setInterval(data => {
      // console.log(this.time);
      if(this.time != 0){
        this.time --;
      }
      else {
        clearInterval(interval);
        this.gameStateAnswer();
      }
    }, 1000);
  }
}
