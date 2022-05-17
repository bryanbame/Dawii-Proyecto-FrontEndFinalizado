import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {

  nombre:string="";
  direccion:string="";
  estado:boolean=true;
  selPais:number=-1;
  codigoPostal:string="";

  paises: Pais[] = [];

  sedes: Sede[] = [];

  constructor(private paisService:PaisService, private sedeService:SedeService) { 
    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
  }

  consultaSede(){
    this.sedeService.consultaSede(this.nombre,this.direccion,this.estado?1:0,this.codigoPostal,this.selPais).subscribe(
      (x) => {
        this.sedes = x.lista;
        alert(x.mensaje);
      }
    );
  }
  ngOnInit(): void {
  }

}
