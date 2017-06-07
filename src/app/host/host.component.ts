import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { HostService} from '../host.service';

@Component({
  selector: 'app-start',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
  providers: [HostService]
})
export class HostComponent implements OnInit {
  games: FirebaseListObservable<any[]>;

  constructor(private hostService: HostService) { }

  createGame(){
    this.HostService.createGame();
  }

  ngOnInit() {
    this.games = this.hostService.getGames();
  }
}
