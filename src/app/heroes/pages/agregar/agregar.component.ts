import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: "DC - Comics"
    },
    {
      id: 'Marvel Comics',
      desc: "Marvel - Comics"
    },
  ]

  heroe: Heroe = {
    id:               "",
    superhero:        "",
    publisher:        Publisher.DCComics,
    alter_ego:        "",
    first_appearance: "",
    characters:       "",
    alt_img:          "",
  }

  constructor( 
        private heroeService: HeroesService,
        private activateRoputer : ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog : MatDialog,
               ) { }

  ngOnInit(): void {

    if(  !this.router.url.includes('editar') ){
        return;
    }

    this.activateRoputer.params
      .pipe(
        switchMap(({id}) => this.heroeService.getHeroePorId(id)       )
      )
      .subscribe(  heroe => this.heroe = heroe )

  }

  guardar(){

    if(this.heroe.superhero.trim().length === 0){
      return ;
    }

    if( this.heroe.id ){
      // Actualizar
      this.heroeService.actualizarHeroe( this.heroe )
      .subscribe( heroe => this.mostrarSnakBar("Registro actualizado"))

    }else{
      //CREAR
      this.heroeService.agregarHeroe( this.heroe )
      .subscribe( heroe =>{
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnakBar("Registro Creado");
      } )
    }
  }

  borrarHeroe(){

    const dialog = this.dialog.open( ConfirmarComponent , {
      width: '550px',
      data: this.heroe
    })

    dialog.afterClosed()
      .subscribe( result => {

        if(result){
          this.heroeService.borrarHeroe( this.heroe.id!)
            .subscribe( resp =>{
              this.router.navigate(['/heroes'])
            } )
        }

      })

    // this.heroeService.borrarHeroe( this.heroe.id! )
    //   .subscribe( resp =>{
    //     this.router.navigate(['/heroes'])
    //   } )

  }

  mostrarSnakBar ( mensaje: string ){

    this.snackBar.open(  mensaje, "ok!", {
      duration: 2500
    } )

  }

}
