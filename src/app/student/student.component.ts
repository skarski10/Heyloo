import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
import { StudentService } from '../student.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { HostService } from '../host.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService, HostService]
})
export class StudentComponent implements OnInit {
  students: FirebaseListObservable<any[]>;
  studentId: string;
  studentToDisplay: Player;
  thisGame: <FirebaseListObservable<any[]>;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach(urlParameters => {
      this.thisGame = this.hostService.getGameFromCode(urlParameters['roomcode']);
    })
  }
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
