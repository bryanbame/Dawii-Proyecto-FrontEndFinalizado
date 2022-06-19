import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  productos: Producto[] = [];
  filtro: string ="";
  marcas : Marca[] = [];
  paises : Pais[] = [];
    producto : Producto = {
      idProducto:0,
      nombre:"",
      serie:"",
      durabilidad:"",
      precio:0,
      stock:0,
      estado:1,
      marca:{
        idMarca:-1
              },
      pais:{
      idPais:-1
            }
      };

constructor(private ProductoService:ProductoService) {

  ProductoService.listarMarca().subscribe(x=>{
    this.marcas=x;
   });
   ProductoService.listarPais().subscribe(x=>{
     this.paises=x;
   })
}
  
  ngOnInit(): void {
  }
  

  consulta(){
    this.ProductoService.listaProducto(this.filtro==""?"todos":this.filtro).subscribe(
      (x) => this.productos = x
    );
  }

  actualizaEstado(aux: Producto){

    aux.estado= aux.estado == 0? 1:0;
    this.ProductoService.actualizaProducto(aux).subscribe();
  }

  registra(){
        this.ProductoService.registraProducto(this.producto).subscribe(
              (x) => {
                document.getElementById("btn_reg_limpiar")?.click();
                document.getElementById("btn_reg_cerrar")?.click();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: x.mensaje,
                  showConfirmButton: false,
                  timer: 1500
                })
                this.ProductoService.listaProducto(this.filtro==""?"todos":this.filtro).subscribe(
                        (x) => this.productos = x
                );

              } 
        );

        this.marcas = [];
        this.paises = [];

        this.producto= {
          idProducto:0,
      nombre:"",
      serie:"",
      durabilidad:"",
      precio:0,
      stock:0,
      estado:1,
      marca:{
        idMarca:-1
              },
      pais:{
      idPais:-1
            }

    }
  }

  buscar(aux :Producto){
    this.producto  = aux;
    this.ProductoService.listarMarca().subscribe(
      (x) => this.marcas = x
    );
    this.ProductoService.listarPais().subscribe(
      (x) => this.paises = x
    );
}

actualiza(){
        this.ProductoService.actualizaProducto(this.producto).subscribe(
              (x) => {
                document.getElementById("btn_act_limpiar")?.click();
                document.getElementById("btn_act_cerrar")?.click();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: x.mensaje,
                  showConfirmButton: false,
                  timer: 1500
                })
                this.ProductoService.listaProducto(this.filtro==""?"todos":this.filtro).subscribe(
                        (x) => this.productos = x
                );
              } 
        );

        this.marcas = [];
        this.paises = [];
          this.producto= {
            idProducto:0,
            nombre:"",
            serie:"",
            durabilidad:"",
            precio:0,
            stock:0,
            estado:1,
            marca:{
              idMarca:-1
                    },
            pais:{
            idPais:-1
                  }
          }
      }

 elimina (aux : Producto){
  Swal.fire({
    title: '¿Estás seguro de eliminar?',
    text: "¡No se puede revertir el cambio!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, elimínalo'
  }).then((result) => {
    if (result.isConfirmed) {
      this.ProductoService.eliminaProducto(aux.idProducto).subscribe(
        (x) => {
          Swal.fire('¡Eliminado!',x.mensaje,'success'
          )
          this.ProductoService.listaProducto(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.productos = x
          );
        } 
    );

    }
  })
   
 }

}
