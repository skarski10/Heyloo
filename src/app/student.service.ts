import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { Player } from './player.model';
import { Question } from './question.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class StudentService {
  players: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) { }

  getStudent(id: string, gamekey: string){
    return this.database.object('games/' + gamekey + 'player_list' + id);
  }

  addStudent(newPlayer: Player) {
    this.players.push(newPlayer);
  }

  getStudentGameKeyAndId(key: string, id: number){
    for(let i=0; i<this.subGames.length; i++){
      if(this.subGames[i].id == roomcode){
        thisGame = this.getGame(this.subGames[i]['$key']);
      }
    }
    return thisGame;
  }
  // answerQeustion(answer: string, currentPlayer: Player){
  //   currentPlayer.
  // }
}
