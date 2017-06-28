import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Player } from './player.model';
import { HostService } from './host.service';
import { StudentService } from './student.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class StudentloadService {

  constructor(private hostService: HostService, private studentService: StudentService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Player | boolean {
    let studentId = +route.params['studentid'];
    let currentGame = this.hostService.getGameFromCode(route.params['roomcode']);
    let currentGameKey;
    currentGame.subscribe(data => {
      console.log(data);
      currentGameKey = data['$key'];
    })
    if(this.studentService.getStudentGameKeyAndId(currentGameKey, studentId)){
      console.log('success')
      var studentObject = this.studentService.getStudentGameKeyAndId(currentGameKey, studentId)
      return studentObject
    }else {
      console.log('failure')
      this.router.navigate(['/start']);
      return false;
    }
  }

}
