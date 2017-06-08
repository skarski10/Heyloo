import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Game } from './game.model';
import { Player } from './player.model';
import { Question } from './question.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class HostService {
  games: FirebaseListObservable<any[]>;
  questionData;

  constructor(private database: AngularFireDatabase, private http: Http) {
    this.games = database.list('games');
    this.http.get('../../sample-game.json')
      .subscribe(result => this.questionData = result.json());
  }

  getGames(){
    return this.games;
  }

  getGame(chosenGameId: string){
    return this.database.object('games/' + chosenGameId);
  }

  randomId(){
    return Math.floor(Math.random()*90000) + 10000;
  }

  createGame(){
    var freshGame: Game = new Game(this.randomId(), "starting", false, [], []);
    this.games.push(freshGame);
    return freshGame;
  }
}
