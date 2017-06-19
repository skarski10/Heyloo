import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
import { StudentService } from '../student.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { HostService } from '../host.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService, HostService]
})
export class StudentComponent implements OnInit {
  currentGame: FirebaseObjectObservable<any[]>;
  currentStudent: FirebaseObjectObservable<any[]>;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router, private hostService: HostService) { }

  ngOnInit() {
    var currentGameKey;
    var studentId;
    this.route.params.forEach(urlParameters => {
      this.currentGame = this.hostService.getGameFromCode(urlParameters['roomcode']);
      studentId = urlParameters['studentid'];
    })
    this.currentGame.subscribe(data => {
      currentGameKey = data['$key'];
    })
    this.currentStudent = this.studentService.getStudentGameKeyAndId(currentGameKey, studentId);
    console.log(this.currentStudent);
  }
  // getStudentAnswer(answer: number){
  //   if(){
  //     this.currentStudent.
  //   }
  // }
}


// this.route.params.forEach((urlParameters) => {
//   this.studentId = urlParameters['id'];
//     });
//      this.studentService.getStudent(this.studentId).subscribe(dataLastEmittedFromObserver => {
//     //  this.studentToDisplay = new Player
//      (dataLastEmittedFromObserver.name,
//      dataLastEmittedFromObserver.correct,
//      dataLastEmittedFromObserver.wrong)
//    })
//    this.students = this.studentService.getStudents();

//https://stackoverflow.com/questions/36320821/passing-multiple-route-params-in-angular2     HOW TO USE MULTIPLE ROUTER PARAMS
