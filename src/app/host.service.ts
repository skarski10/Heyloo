import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Game } from './game.model';
import { Player } from './player.model';
import { Question } from './question.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import { QUESTIONS } from './sample-questions';

@Injectable()
export class HostService {
  games: FirebaseListObservable<any[]>;
  subGames: Game[];

  constructor(private database: AngularFireDatabase, private http: Http, private router: Router) {
    this.games = database.list('games');
    this.games.subscribe(data => {this.subGames = data
  })
  }

  getGames(){
    return this.games;
  }

  getGame(chosenGameId: string){
    return this.database.object('games/' + chosenGameId);
  }

  getGameFromCode(roomcode: number){
    var subGames;
    var thisGame;
    this.games.subscribe(data => {
      subGames = data;
    })
    for(let i=0; i<subGames.length; i++){
      if(subGames[i].id == roomcode){
        thisGame = this.getGame(subGames[i]['$key']);
      }
    }
    return thisGame;
  }

  getGameKey(game){
    game.subscribe(data => {
      return data['$key'];
    })
  }

  getCurrentGamePlayerList(id: string){
    return this.database.list('games/' + id + '/player_list')
  }

  randomId(){
    return Math.floor(Math.random()*90000) + 10000;
  }

  startGame(newGame: Game){
    this.games.push(newGame);
    this.router.navigate(['host', newGame.id]);
    return newGame;
  }

  getQuestions() {
    return QUESTIONS;
  }

  editGameState(gameState, game){
    var currentGame = this.getGameFromCode(game.id);
    currentGame.update({game_state: gameState});
  }

  nextQuestion(game){
    var nextQuestion;
    var currentGame = this.getGameFromCode(game.id);
    currentGame.subscribe(data => {
      nextQuestion = data['current_question'];
    })
    currentGame.update({current_question: nextQuestion + 1});
  }

  gameOver(game){
    var currentGame = this.getGameFromCode(game.id);
    currentGame.update({game_over: true});
  }

  updatePlayerList(players, game){
    var currentGame = this.getGameFromCode(game.id);
    currentGame.update({player_list: players});
  }

  updatePlayerChoice(questions, game){
    var currentGame = this.getGameFromCode(game.id);
    currentGame.update({question_list: questions});
  }
}
