import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-consulta-marca',
  templateUrl: './consulta-marca.component.html',
  styleUrls: ['./consulta-marca.component.css']
})
export class ConsultaMarcaComponent implements OnInit {

  nombre:string="";
  certificado:string="";
  selPais:number=-1;
  estado:boolean = true;
  fecInicio:string = ""; 
  fecFin:string = "";

  paises: Pais[] = [];

  marcas: Marca[] = [];

  constructor(private paisService:PaisService, private marcaService:MarcaService) { 

    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
  }

  consultaMarca(){
    this.marcaService.consultaMarca(this.nombre,this.certificado,this.selPais, this.estado?1:0, this.fecInicio, this.fecFin).subscribe(
      (x) => {
        this.marcas = x.lista;
        alert(x.mensaje);
      }
    );
  }

  ngOnInit(): void {}

}