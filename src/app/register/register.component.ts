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
    console.log(this.games);
    this.games.subscribe(data => {this.subGames = data;
    console.log(this.subGames
    )
  });
  }

  register(username: string, roomcode: number){
    console.log(this.subGames);
    for(let i=0; i<this.subGames.length;i++){
      if(this.subGames[i].id = roomcode){
        this.currentGame = this.subGames[i];
      }
    }
    console.log(this.currentGame);
  }

}
