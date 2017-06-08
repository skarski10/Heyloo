import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
import { StudentService } from '../student.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {
  players: FirebaseListObservable<any[]>;
  studentId: string;
  studentToDisplay: Player;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.studentId = urlParameters['id'];
        });
         this.studentService.getStudent(this.studentId).subscribe(dataLastEmittedFromObserver => {
         this.studentToDisplay = new Player
         (dataLastEmittedFromObserver.name,
         dataLastEmittedFromObserver.correct,
         dataLastEmittedFromObserver.wrong)
       })
       this.players = this.studentService.getStudents();
  }
  createPlayer(name: string, correct: number, wrong: number) {
      var newStudent: Player = new Player(name, correct, wrong);
      this.studentService.addPlayer(newStudent);
    }
}
