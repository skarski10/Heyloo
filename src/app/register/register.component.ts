import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
import { Game } from '../game.model';
import { HostService } from '../host.service';
import { StudentService } from '../student.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HostService, StudentService]
})
export class RegisterComponent implements OnInit {
  games: FirebaseListObservable<any[]>;
  subGames: Game[];
  currentGame: Game;

  constructor(private studentService:StudentService, private hostService: HostService) { }

  ngOnInit() {
    this.games = this.hostService.getGames();
  }

  register(username: string, roomcode: number){
    this.currentGame = this.hostService.getGameFromCode(roomcode);
    var newPlayer = new Player(username, 0, 0);
    console.log(this.currentGame);
    this.currentGame.player_list.push(newPlayer);
    // https://stackoverflow.com/questions/39401228/get-child-of-firebaseobjectobservable-angularfire2
  }

}
