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
  result: Object;
  questionData;
  questionUrl = 'src/assets/mock-data/sample-questions.json';
  time = new Date(500, 0, 0, 1, 0, 0);

  constructor(private database: AngularFireDatabase, private http: Http) {
    this.games = database.list('games');
    this.games.subscribe(data => {this.subGames = data
    // console.log(this.subGames);
    this.preQuestionCountdown();
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
    // console.log(roomcode);
    // console.log(this.subGames);
    for(let i=0; i<this.subGames.length; i++){
      // console.log(this.subGames[i].id)
      if(this.subGames[i].id == roomcode){
        // console.log(roomcode);
        // console.log(this.subGames[i].id);
        thisGame = this.getGame(this.subGames[i]['$key']);
      }
    }
    // console.log(thisGame);
    return thisGame;
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

  // getQuestions() {
  //   this.result = {questions:[]};
  //   return this.http.get(this.questionUrl)
  //                .map((res:Response) => res.json())
  //                .subscribe(res => this.result = res)
  // }
  getQuestions() {
    return QUESTIONS;
  }

  preQuestionCountdown() {
    this.time.setSeconds(this.time.getSeconds(), -1);
    setTimeout(() => this.preQuestionCountdown(), 1000);
  }
  resetCountdown(){
    this.time = new Date(500, 0, 0, 1, 0, 0);
  }

  editGameState(game){
    var currentGame = this.getGame(game.$key);
    currentGame.update({id: game.id, game_state: game.game_state, game_over: false, player_list: game.player_list, question_list: game.question_list})
  }
}
