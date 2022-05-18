import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css']
})
export class ConsultaProductoComponent implements OnInit {

  nombre:string="";
  serie:string="";
  idMarca:number=-1;
  idPais:number=-1;
  estado:boolean = true;

  paises: Pais[] = [];

  marcas: Marca[] = [];

  productos: Producto[] = [];

  constructor(private paisService:PaisService, private marcaService:MarcaService, private productoService:ProductoService) { 

    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );

    this.marcaService.listaMarca().subscribe(
      (x) => this.marcas = x
    );
  }

  /*constructor(private marcaService:MarcaService, private productoService:ProductoService) { 

    this.marcaService.listaMarca().subscribe(
      (x) => this.marcas = x
    );
  }*/

  consultaProducto(){
    this.productoService.consultaProducto(this.nombre,this.serie,this.idMarca,this.idPais, this.estado?1:0).subscribe(
      (x) => {
        this.productos = x.lista;
        alert(x.mensaje);
      }
    );
  }

  ngOnInit(): void {}

}
