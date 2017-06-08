import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { Player } from './player.model';
import { Question } from './question.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class HostService {
  games: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    // this.games = database.list('games');
  }
  //
  // getGames(){
  //   return this.games;
  // }
  //
  // getGame(chosenGameId: string){
  //   return this.database.object('games/' + chosenGameId);
  // }

  // randomId(){
  //   return Math.floor(Math.random()*90000) + 10000;
  // }
  //
  // createGame(){
  //   var freshGame: Game = new Game(this.randomId(), "starting", false, [], []);
  //   this.games.push(freshGame);
  // }
}
