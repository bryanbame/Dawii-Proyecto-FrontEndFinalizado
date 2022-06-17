import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';
import { FormGroup, FormControl , Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-crud-sede',
  templateUrl: './crud-sede.component.html',
  styleUrls: ['./crud-sede.component.css']
})
export class CrudSedeComponent implements OnInit {
  //Para la grilla
  sedes: Sede[] = [];
  filtro: string ="";
  //Para lista de Pais
  paises : Pais[]= [];
  //JSon para registrar o actualizar
    sede : Sede = {
      idSede:0,
      nombre:"",
      direccion:"",
      estado:1,  
      codigoPostal:"",
      pais:{
      idPais:-1
            }
      };

  //Declaracion de validaciones
  //formsRegistra = new FormGroup({
  //  validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
   // validaDireccion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]{3,30}')]),
   // validaFecha: new FormControl('', [Validators.required]),
   // validaCodigoPostal: new FormControl('', [Validators.required,Validators.pattern('[0-9]{5}')]),
  //  validaPais: new FormControl('', [Validators.min(1)]),
 // });
   //Declaracion de validaciones
 //  formsActualiza = new FormGroup({
  // validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  // validaDireccion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]{3,30}')]),
  //  validaFecha: new FormControl('', [Validators.required]),
  //  validaCodigoPostal: new FormControl('', [Validators.required,Validators.pattern('[0-9]{5}')]),
   // validaPais: new FormControl('', [Validators.min(1)]),
   // validaEstado: new FormControl('', [Validators.min(1)]),
  //});

  //para verificar que pulsa el boton
   // submitted = false;

constructor(private paisService:PaisService, private sedeService:SedeService) { 

    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
    
}
  
  ngOnInit(): void {
  }
  

  consulta(){
    this.sedeService.listaSede(this.filtro==""?"todos":this.filtro).subscribe(
      (x) => this.sedes = x
    );
  }

  actualizaEstado(aux: Sede){

    aux.estado= aux.estado == 0? 1:0;
    this.sedeService.actualizaSede(aux).subscribe();
  }

  registra(){
    //this.submitted = true;
     //finaliza el método si hay un error
    // if (this.formsRegistra.invalid) {
    //  return;
    //}
        this.sedeService.registraSede(this.sede).subscribe(
              (x) => {
                document.getElementById("btn_reg_limpiar")?.click(); //16-06
                document.getElementById("btn_reg_cerrar")?.click();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: x.mensaje,
                  showConfirmButton: false,
                  timer: 1500
                })
                this.sedeService.listaSede(this.filtro==""?"todos":this.filtro).subscribe(
                        (x) => this.sedes = x
                );

              } 
        );

        //limpiar los comobobox
        this.paises = [];

        //limpiar los componentes del formulario a través de los ngModel
        this.sede= {
          idSede:0,
          nombre:"",
          direccion:"",
          estado:1,  
          //fechaCreacion: new Date(0),
          codigoPostal:"",       
          pais:{
            idPais:-1
          }
    }
  }

  buscar(aux :Sede){
    this.sede  = aux;
    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
}

actualiza(){
  //this.submitted = true;

    //finaliza el método si hay un error
  //  if (this.formsActualiza.invalid) {
   //   return;
  //  }
        this.sedeService.actualizaSede(this.sede).subscribe(
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
                this.sedeService.listaSede(this.filtro==""?"todos":this.filtro).subscribe(
                        (x) => this.sedes = x
                );
              } 
        );

        //limpiar los comobobox
        this.paises = [];
        //limpiar los componentes del formulario a través de los ngModel
          this.sede= {
          idSede:0,
          nombre:"",
          direccion:"",
          estado:1,  
          codigoPostal:"",       
          pais:{
          idPais:-1
                }
          }
      }

 elimina (aux : Sede){
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
      this.sedeService.eliminaSede(aux.idSede).subscribe(
        (x) => {
          Swal.fire('¡Eliminado!',x.mensaje,'success'
          )
          this.sedeService.listaSede(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.sedes = x
          );
        } 
    );

    }
  })
   
 }
}
