import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registra-producto',
  templateUrl: './registra-producto.component.html',
  styleUrls: ['./registra-producto.component.css']
})
export class RegistraProductoComponent implements OnInit {

  marcas: Marca[] = [];
  paises: Pais[] = [];
  producto: Producto ={
    marca:{
      idMarca:-1
    },
    pais:{
      idPais:-1
    }

  };

  constructor(private MarcaService:  MarcaService, private ProductoService:ProductoService) {

      /*this.(
        (x) => this.productos = x
      );*/
   };

   

   cargaPais(){
     console.log(">>> Carga Pais >> ");
     console.log(">>> Departamento >> " +this.producto.marca?.idMarca);

     


   }

   registraProducto(){
     this.ProductoService.registrar(this.producto).subscribe(
       response=>{
         alert(response.men);
       }
     )
   }

  ngOnInit(): void {
  }

}
