import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Game } from './game.model';
import { Player } from './player.model';
import { Question } from './question.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class HostService {
  games: FirebaseListObservable<any[]>;
  subGames

  questionData;

  constructor(private database: AngularFireDatabase, private http: Http) {
    this.games = database.list('games');
    this.games.subscribe(data => {this.subGames = data
    console.log(this.subGames);
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
    // console.log(this.subGames);
    for(let i=0;i<this.subGames.length;i++){
      if(this.subGames[i].id = roomcode){
        thisGame = this.getGame(this.subGames[i]['$key']);
        // console.log(thisGame);
      }
    }
    return thisGame;
  }

  getCurrentGamePlayerList(id: string){
    var theList = [];
    this.database.list('games/' + id + '/player_list').subscribe(data=>{
      console.log(data);
      for(let i = 0; i<data.length; i++){
        theList.push(data[i])
      }
    })
    return theList;
  }

  randomId(){
    return Math.floor(Math.random()*90000) + 10000;
  }

  createGame(newGame: Game){
    this.games.push(newGame);
    return newGame;
  }

  getQuestions(){
    return this.http.get('data/data.json')
        .subscribe(res => res.json());
  }
}
