import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
import { Game } from '../game.model';
import { Question } from '../question.model';
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
  questions: Question[];
  currentQuestion: Question;
  games;
  subGames;
  subGame;
  startTime;
  endTime;
  answered: boolean;
  subStudent;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router, private hostService: HostService) {
  }

  ngOnInit() {
    this.games = this.hostService.getGames();
    this.games.subscribe(data => this.subGames = data);
    // console.log(this.subGames, 'student sub games');
    var currentGameKey;
    var studentId;
    this.route.params.forEach(urlParameters => {
      this.currentGame = this.hostService.getGameFromCode(urlParameters['roomcode']);
      studentId = urlParameters['studentid'];
    })
    this.currentGame.subscribe(data => {
      currentGameKey = data['$key'];
      this.currentQuestion = data['question_list'][data['current_question']];
    })
    this.currentStudent = this.studentService.getStudentGameKeyAndId(currentGameKey, studentId);
    this.currentStudent.subscribe(data => {
      this.subStudent = data;
    })
    //lines 33 through 49 are necessary to even load the page properly, would like to cut down somewhat.
    this.questions = this.hostService.getQuestions();
    this.currentGame.subscribe(data => {
      this.subGame = data;
    })
    this.answered = false;
    this.startTime = 0;
    this.endTime = 0;
  }

  ngDoCheck(){
    // console.log(this.subGame);
    if(this.subGame['game_state'] == "answer"){
      console.log('game state now answer')
      this.answered = false;
      this.updateGame();
    }else if(this.subGame['game_state'] == 'question'){
      console.log('game state now question', this.answered, this.endTime)
      // this.setAnsweredToFalse();
      this.setStartTime();
    }
    //this is for watching the game_state property so that modifications and setup can be managed automatically
  }

  getStudentAnswer(answer: number){
    var questionAnswer;
    this.currentQuestion.student_choices[answer] ++;
    this.questions[this.subGame.current_question] = this.currentQuestion;
    this.hostService.updatePlayerChoice(this.questions, this.subGame);
    this.endTime = new Date().getTime();
    this.answered = true;
    console.log(this.answered, "set answered to true");
    if(answer == this.currentQuestion.answer){
      this.studentService.editStudentPoints(this.currentStudent, true, this.scoringAlgorithm(this.endTime, this.startTime));
    }
    else{
      this.studentService.editStudentPoints(this.currentStudent, false, 0);
    }
    this.startTime = 0;
    this.endTime = 0;
  }

  scoringAlgorithm(end, start){
    var dif = (end - start) / 1000
    var score = Math.round((-150 * Math.log(30/(-dif + 30))) + 1000)
    return score;
  }

  updateGame(){
    this.currentGame.subscribe(data => {
      this.subGame = data;
    })
    //this is just for resubscribing the local object
  }

  // setAnsweredToFalse(){
  //   if(this.endTime == 0){
  //     this.answered = false;
  //   }
  //   //more state management
  // }

  setStartTime(){
    if (this.startTime == 0){
      this.startTime = new Date().getTime();
    }
  }
}
