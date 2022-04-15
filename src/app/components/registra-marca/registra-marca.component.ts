import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-registra-marca',
  templateUrl: './registra-marca.component.html',
  styleUrls: ['./registra-marca.component.css']
})
export class RegistraMarcaComponent implements OnInit {

  lstPaises: Pais[] = [];

  constructor(private paisService:PaisService) { 

    this.paisService.listaPais().subscribe(
      paises => this.lstPaises = paises
    );
  }

  ngOnInit(): void {
  }

}
