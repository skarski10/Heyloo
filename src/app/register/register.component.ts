import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
import { Game } from '../game.model';
import { HostService } from '../host.service';
import { StudentService } from '../student.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HostService, StudentService]
})
export class RegisterComponent implements OnInit {
  games: FirebaseListObservable<any[]>;
  subGames: Game[];
  currentGame: FirebaseObjectObservable<any[]>;
  playerList: FirebaseListObservable<any[]>;
  roomCode: number;
  currentPlayer: Player;

  constructor(private studentService:StudentService, private hostService: HostService, private router: Router) { }

  ngOnInit() {
    this.games = this.hostService.getGames();
  }

  register(username: string, roomcode: number){
    this.roomCode = roomcode;
    this.currentGame = this.hostService.getGameFromCode(roomcode);
    var newPlayer = new Player(username, 0, 0, this.hostService.randomId());
    this.currentPlayer = newPlayer;
    this.currentGame.subscribe(data=>{
      this.playerList = this.hostService.getCurrentGamePlayerList(data["$key"]);
    },
      function(err){
        console.log(err)
      },
      function(){
        this.playerList.push(newPlayer);
      })
    this.playerList.push(newPlayer);
    this.router.navigate(['student', roomcode, newPlayer.id]);
    // https://stackoverflow.com/questions/39401228/get-child-of-firebaseobjectobservable-angularfire2
  }
  //the method above make the game wait for all the players fromt he firebase to load before adding and navigating to the student room.

}
