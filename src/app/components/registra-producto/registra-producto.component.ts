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

  }

  constructor(private ProductoService:ProductoService) {

      ProductoService.listarMarca().subscribe(x=>{
        this.marcas=x;
       });
       ProductoService.listarPais().subscribe(x=>{
         this.paises=x;
       })
   }


   registraProducto(){
     this.ProductoService.registrar(this.producto).subscribe(
       response=>{
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
