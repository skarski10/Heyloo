import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';
import { Game } from '../game.model';
import { HostService } from '../host.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [HostService]
})
export class StartComponent implements OnInit {
  games:FirebaseListObservable<any[]>;

  constructor(private router: Router, private hostService: HostService) { }

  ngOnInit() {
    this.games = this.hostService.getGames();
    // this.currentGame = this.hostService.createGame();
  }

  startGame(clickedGame){
    this.router.navigate(['host', clickedGame.id]);
  }

}
