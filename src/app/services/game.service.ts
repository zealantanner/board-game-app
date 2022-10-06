import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap, Observable } from 'rxjs'
import { Game } from '../interfaces/game'

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(private http: HttpClient) { }

    searchByName(searchText: string): Observable<Game[]> {
        const alteredText = searchText.replace(/\s/g, '+');
        return this.http.get<Game[]>(`https://api.boardgameatlas.com/api/search?name=${alteredText}&client_id=${environment.boardgameAPI}`).pipe(
            map(response => response['games']),
            tap(res => console.log('not games',res)),
            tap(res => console.log('games',res['games'])),
        )
    };
    getById(gameId: string): Observable<Game> {
        return this.http.get<Game>(`https://api.boardgameatlas.com/api/search?ids=${gameId}&client_id=${environment.boardgameAPI}`).pipe(
            map(response => response['games'])
        );
    }
}
