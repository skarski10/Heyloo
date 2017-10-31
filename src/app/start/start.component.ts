import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';
import { Game } from '../game.model';
import { Question } from '../question.model';
import { HostService } from '../host.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [HostService]
})
export class StartComponent implements OnInit {
  games:FirebaseListObservable<any[]>;
  questions: Question[];

  constructor(private router: Router, private hostService: HostService) { }

  ngOnInit() {
    this.questions = this.hostService.getQuestions();
    this.games = this.hostService.getGames();
  }

  joinGame(){
    this.router.navigate(['register']);
  }

  randomId(){
    return Math.floor(Math.random()*90000) + 10000;
  }

  createGame(){
    var newGame: Game = new Game(this.randomId(), "starting", false, [], this.questions);
    this.hostService.startGame(newGame);
  }
}
