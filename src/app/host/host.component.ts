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
  currentQuestion: Question;
  time: number = 0;
  topPlayers;
  private showQuestion = false;
  private hideBarGraph = true;
  currentQuestionSubstring;

  constructor(private route: ActivatedRoute, private hostService: HostService, private router: Router, private location: Location) {
   }

  ngOnInit() {
    var gameKey;
    this.questions = this.hostService.getQuestions();
    this.games = this.hostService.getGames();
    this.route.params.forEach((urlParameters) => {
      this.gameId = urlParameters["id"];
    });
    this.hostService.getGameFromCode(this.gameId).subscribe(data => {
      this.currentGame = new Game
      (data.id,
      data.game_state,
      data.game_over,
      data.player_list,
      data.question_list)
      });
      this.subGame = this.hostService.getGameFromCode(this.currentGame.id);
      this.getPlayerList(this.currentGame.id);
      this.subGame.subscribe(data => {
        gameKey = data['$key'];
        this.currentQuestion = data['question_list'][data['current_question']];
      })
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
  gameStatePreQuestion(){
    var substring;
    this.hostService.editGameState('prequestion', this.currentGame);
    substring = this.currentQuestion.prompt;
    this.currentQuestionSubstring = substring.substring(0, 5);
    this.preQuestionCountdown();
  }

  gameStateQuestion(){
    this.hostService.editGameState('question', this.currentGame);
    this.thirtySeconds();
  }

  gameStateAnswer(){
    this.hostService.editGameState('answer', this.currentGame);
  }

  gameStateLeaderboard(){
    this.hostService.nextQuestion(this.currentGame);
    this.getLeaderboard();
    this.hostService.editGameState('leaderboard', this.currentGame);
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
        this.gameStatePreQuestion();
      }
    }, 1000);
  }

  preQuestionCountdown(){
    this.time = 10;
    var interval = setInterval(data => {
      if(this.time != 0){
      // console.log(this.time);
        this.time --;
      }
      else {
        clearInterval(interval);
        this.gameStateQuestion();
      }
    }, 1000);
  }

  thirtySeconds(){
    this.time = 2;
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

  deleteStudent(player){
    var players;
    this.playerList.subscribe(data => {
      players = data;
    })
    for(let i = 0; i < players.length; i++){
      if(players[i].id == player.id){
        players.splice(i, 1);
      }
    }
    this.hostService.updatePlayerList(players, this.currentGame);
  }

  endGame(){
    this.hostService.gameOver(this.currentGame);
    this.gameStateLeaderboard();
  }
  getLeaderboard(){
    var leaderboard = [];
    var players;
    var current = this;
    this.playerList.subscribe(data => {
      players = data;
    })
    leaderboard = players.sort(function(a, b){
      return b.points-a.points
    })
    this.topPlayers = leaderboard.slice(0, 5);
  }
}
