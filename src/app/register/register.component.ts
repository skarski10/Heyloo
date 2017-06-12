import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../player.model';
import { Game } from '../game.model';
import { HostService } from '../host.service';
import { StudentService } from '../student.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

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
  playerList: any[];

  constructor(private studentService:StudentService, private hostService: HostService) { }

  ngOnInit() {
    this.games = this.hostService.getGames();
  }

  register(username: string, roomcode: number){
    this.currentGame = this.hostService.getGameFromCode(roomcode);
    // console.log(this.currentGame);
    this.currentGame.subscribe(data=>{console.log(data)});
    var newPlayer = new Player(username, 0, 0);
    this.currentGame.subscribe(data=>{
      this.playerList = this.hostService.getCurrentGamePlayerList(data["$key"]);
      console.log(this.playerList);
    });
    console.log('before push')
    this.playerList.push(newPlayer);
    console.log(this.playerList);
    console.log('after push')
    this.currentGame.update({"player_list": this.playerList});
    console.log('after update')
    // https://stackoverflow.com/questions/39401228/get-child-of-firebaseobjectobservable-angularfire2
  }

}
