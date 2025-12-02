import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { RawgService } from '../../../../services/rawg.service';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  games: any[] = [];
  loading = true;

  constructor(private rawg: RawgService) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.loading = true;
    this.rawg.getGames().subscribe((data : any) => {
      this.games = data.results;
      this.loading = false;
    });
  }
}
