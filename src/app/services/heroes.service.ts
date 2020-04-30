import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-pp-ba34e.firebaseio.com/';

  constructor( private http: HttpClient) { }

  createHero( hero: HeroeModel ) {
    return this.http.post(`${this.url}/heroes.json`, hero)
    .pipe(
      map((resp: any) => {
        hero.id = resp.name;
        return hero;
      })
    );
  }

  upDateHero( hero: HeroeModel) {
    const heroTemp = {
      ...hero
    };

    delete heroTemp.id;

    return this.http.put(`${this.url}/heroes/${hero.id}.json`, hero);
  }

}
