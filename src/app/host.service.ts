import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
  allQuestions: FirebaseListObservable<any[]>;
  gameQuestions: Question[];

  constructor(private database: AngularFireDatabase, private http: Http) {
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
    var thisGame;
    for(let i=0; i<this.subGames.length; i++){
      if(this.subGames[i].id == roomcode){
        thisGame = this.getGame(this.subGames[i]['$key']);
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

  createGame(newGame: Game){
    this.games.push(newGame);
    return newGame;
  }

  getQuestions() {
    return QUESTIONS;
  }

  getQuestion(indexPosition: number, gamekey: string){
    return this.database.object('games/' + gamekey + 'question_list + [indexPosition]/');
  }

  getQuestionId(key: string, id: number){
    var currentQuestion
    this.allQuestions = this.database.list('games/' + key + 'question_list');
    this.allQuestions.subscribe(data => {
      this.gameQuestions = data
    })
    console.log(this.gameQuestions);
    for(let i=0; i<this.gameQuestions.length; i++){
      console.log(this.gameQuestions[i]);
      console.log(this.gameQuestions[id]);
      if(this.gameQuestions[i] == this.gameQuestions[id]){
        currentQuestion = this.getQuestion(this.gameQuestions[i]['$key'], key);
      }
      // console.log(question);
    }
    return currentQuestion;
  }

  editGameState(gameState, game){
    var currentGame = this.getGameFromCode(game.id);
    // currentGame.subscribe(data => console.log(data));
    currentGame.update({game_state: gameState});
  }
}
