import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-registra-sede',
  templateUrl: './registra-sede.component.html',
  styleUrls: ['./registra-sede.component.css']
})
export class RegistraSedeComponent implements OnInit {

    paises : Pais[]= [];
    sede : Sede = {
      pais:{
        idPais:-1
      }
    }
    
  constructor(private paisService:PaisService, private sedeService:SedeService) { 

    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
    
} 

  insertaSede(){
      this.sedeService.insertaSede(this.sede).subscribe(
        response =>{
              alert(response.mensaje);
        },
        error =>{
              alert(error);
        }
      );
          
  }
  ngOnInit(): void {
  }

}
