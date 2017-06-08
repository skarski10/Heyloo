import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
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
  subGames

  constructor(private studentService:StudentService, private hostService: HostService) { }

  ngOnInit() {
    this.games = this.hostService.getGames();
    this.subGames = this.games.subscribe();
    console.log(this.subGames);
  }

  register(username: string, roomcode: number){
    var thisGame;
    for(let i=0;i<this.subGames.length;i++){
      if(this.games[i].id = roomcode){
        thisGame = this.hostService.getGame(this.games[i].$key);
      }
    }
    console.log(thisGame);
    // thisGame.players.push(username);
  }

}
