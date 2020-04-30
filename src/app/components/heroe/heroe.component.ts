import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { switchAll } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private hero: HeroesService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.hero.getHeroe(id)
      .subscribe( (resp: HeroeModel ) => {
        this.heroe = resp;
        this.heroe.id = id;
      })
    }
  }

  save(form: NgForm) {

    if (form.invalid) {
      console.log('Form invalid');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardande información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let petition: Observable<any>;

    if (this.heroe.id) {
      petition = this.hero.upDateHero(this.heroe);

      petition.subscribe( resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizó correctamente',
          icon: 'success'
        });
      });

    } else {

      petition = this.hero.createHero(this.heroe);
      petition.subscribe( resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se creó correctamente',
              icon: 'success'

            });
          });
    }

  }

}
