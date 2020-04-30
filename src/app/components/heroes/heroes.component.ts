import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  hero: HeroeModel[] = [];
  loading = false;

  constructor( private heroServ: HeroesService) { }

  ngOnInit(): void {


    this.loading = true;

    setTimeout(() => {
      this.heroServ.getHeroes( )
          .subscribe( (resp: HeroeModel[]) => {
            console.log(resp);
            this.hero = resp;
            this.loading = false;
          });
    }, 1000);


  }

  deleteHero( hero: HeroeModel, i: number ) {
    Swal.fire({
      title: '¿está seguro?',
      text: `Está seguro que quiere eliminar a ${hero.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value) {
            this.heroServ.deleteHero(hero.id).subscribe();
            this.hero.splice(i, 1);
      }
    });

  }

}
