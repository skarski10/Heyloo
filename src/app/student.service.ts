import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { Player } from './player.model';
import { Question } from './question.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class StudentService {

  constructor(private database: AngularFireDatabase, private studentService: StudentService) { }

  getStudent(id: number){
    
  }
}
