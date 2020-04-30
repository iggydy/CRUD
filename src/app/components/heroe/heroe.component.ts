import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private hero: HeroesService ) { }

  ngOnInit(): void {
  }

  save(form: NgForm) {

    if (form.invalid) {
      console.log('Form invalid');
      return;
    }

    if (this.heroe.id) {
      this.hero.upDateHero(this.heroe)
      .subscribe( resp => {
        console.log(resp);
      });

    } else {

      this.hero.createHero(this.heroe)
      .subscribe( resp => {
        this.heroe = resp;
      });
    }

  }

}
