import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Game } from './game.model';
import { Player } from './player.model';
import { Question } from './question.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class HostService {
  games: FirebaseListObservable<any[]>;

  questionData;
  result: Object;

  constructor(private database: AngularFireDatabase, private http: Http) {
    this.games = database.list('games');
  }

  getGames(){
    return this.games;
  }

  getGame(chosenGameId: number){
    return this.database.object('host/' + chosenGameId);
  }

  randomId(){
    return Math.floor(Math.random()*90000) + 10000;
  }

  createGame(){
    var freshGame: Game = new Game(this.randomId(), "starting", false, [], []);
    this.games.push(freshGame);
    return freshGame;
}
  // createGame(newGame: Game){
  //   this.games.push(newGame);
  //   return newGame;
  // }

  // getQuestions(){
  //   this.result = {questions:[]};
  //   return this.http.get('./src/assest/sample-questions.json')
  //                .map((res:Response) => res.json())
  //                .subscribe(res => this.result = res);
  // }
}
