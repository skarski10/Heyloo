import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
import { Question } from '../question.model';
import { StudentService } from '../student.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { HostService } from '../host.service';
import { Question } from '../question.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService, HostService]
})
export class StudentComponent implements OnInit, DoCheck {
  currentGame: FirebaseObjectObservable<any[]>;
  currentStudent: FirebaseObjectObservable<any[]>;
<<<<<<< HEAD
  currentQuestion: Question[];
  startTime;
=======
  questions: Question[];
  currentQuestion;
  currentQuestionIndex: number = 0;
>>>>>>> 481a98ee03ee6479c4571daa925c24b70615463a

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router, private hostService: HostService) { }

  ngOnInit() {
    var currentGameKey;
    var studentId;
    var currenGameQuestion;
    this.route.params.forEach(urlParameters => {
      this.currentGame = this.hostService.getGameFromCode(urlParameters['roomcode']);
      studentId = urlParameters['studentid'];
    })
    this.currentGame.subscribe(data => {
      currentGameKey = data['$key'];
      console.log(data)
      currenGameQuestion = data['current_question'];
    })
    this.currentStudent = this.studentService.getStudentGameKeyAndId(currentGameKey, studentId);
<<<<<<< HEAD
    this.currentGame.subscribe(data => {
      // console.log(data);
      this.currentQuestion = data["question_list"][data["current_question"]]
    })
=======
    this.questions = this.hostService.getQuestions();
    this.currentQuestion = this.hostService.getQuestionKeyAndId(currentGameKey, currenGameQuestion)
  }

  getStudentAnswer(answer: number){
    if(answer == this.currentQuestion.answer){
      this.studentService.editStudentPoints(this.currentStudent, this.currentGame, true);
    }
    else{
      this.studentService.editStudentPoints(this.currentStudent, this.currentGame, false);
    }
>>>>>>> 481a98ee03ee6479c4571daa925c24b70615463a
  }

  ngDoCheck(){
    var state;
    this.currentGame.subscribe(data => {
      state = data['game_state'];
    });

    if(state === "questions"){
      this.startTime = new Date().getTime();
      console.log(this.startTime);
    }
  }

}

<<<<<<< HEAD
=======

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
>>>>>>> 481a98ee03ee6479c4571daa925c24b70615463a

//https://stackoverflow.com/questions/36320821/passing-multiple-route-params-in-angular2     HOW TO USE MULTIPLE ROUTER PARAMS
