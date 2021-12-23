import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-targeta-component',
  templateUrl: './heroe-targeta-component.component.html',
  styles: [`
  
  mat-card {
      margin-top: 20px;
    }
  `
  ]
})
export class HeroeTargetaComponentComponent  {

@Input() heroe! :Heroe;

  constructor() { }



}
