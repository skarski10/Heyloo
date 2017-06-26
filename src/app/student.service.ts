import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { Player } from './player.model';
import { Question } from './question.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { HostService } from './host.service';

@Injectable()
export class StudentService {
  players: FirebaseListObservable<any[]>;
  subPlayers: Player[];

  constructor(private database: AngularFireDatabase, private hostService: HostService) { }

  getStudent(id: string, gamekey: string){
    return this.database.object('games/' + gamekey + '/player_list/' + id);
  }

  addStudent(newPlayer: Player) {
    this.players.push(newPlayer);
  }

  getStudentGameKeyAndId(key: string, id: number){
    var retrievedStudent
    this.players = this.database.list('games/' + key + '/player_list');
    this.players.subscribe(data => {
      this.subPlayers = data
    })
    for(let i=0; i<this.subPlayers.length; i++){
      if(this.subPlayers[i]['id'] == id){
        retrievedStudent = this.getStudent(this.subPlayers[i]['$key'], key);
      }
    }
    return retrievedStudent;
  }

  editStudentPoints(student, correct, score){
    if(correct == true){
      student.update({points: + score, correct: + 1});
    }
    else if(correct == false){
      student.update({wrong: + 1});
    }
  }
}
