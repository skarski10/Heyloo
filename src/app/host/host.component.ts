import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { HostService} from '../host.service';

@Component({
  selector: 'host-component',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  providers: [HostService]
})
export class HostComponent {
  games: FirebaseListObservable<any[]>;
  currentGame;
  constructor(private hostService: HostService) { }

  ngOnInit() {
    this.games = this.hostService.getGames();
    this.currentGame = this.hostService.createGame();

  }
}
