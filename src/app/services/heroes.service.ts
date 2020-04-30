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

  getHeroe( id: string ) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHero( id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }


  getHeroes( ) {
    return this.http.get(`${this.url}/heroes.json`)
        .pipe(
          map( resp => this.createArray(resp))
        );
  }

  private createArray( heroObj: object) {

    const heroes: HeroeModel[] = [];

    console.log(heroObj);

    if ( heroObj === null ) { return []; }

    Object.keys(heroObj).forEach( key => {
      const heroe: HeroeModel = heroObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;

  }

}
