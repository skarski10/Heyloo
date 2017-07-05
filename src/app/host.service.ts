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

  constructor(private database: AngularFireDatabase, private http: Http) {
    this.games = database.list('games');
    this.games.subscribe(data => {this.subGames = data
    console.log(this.subGames, "sub games")
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
      console.log(subGames, "in the function sub games")
    })
    console.log(this.subGames);
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

  createGame(newGame: Game){
    this.games.push(newGame);
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
    var currentGame = this.getGameFromCode(game.id);
    currentGame.update({current_question: + 1});
  }

  gameOver(game){
    var currentGame = this.getGameFromCode(game.id);
    currentGame.update({game_over: true});
  }

  updatePlayerList(players, game){
    var currentGame = this.getGameFromCode(game.id);
    currentGame.update({player_list: players});
  }
}
