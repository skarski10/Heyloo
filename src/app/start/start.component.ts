import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { HostService} from '../host.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [HostService]
})
export class StartComponent implements OnInit {
  games: FirebaseListObservable<any[]>;

  constructor(private hostService: HostService) { }

  ngOnInit() {
    this.games = this.hostService.getGames();
  }
}
