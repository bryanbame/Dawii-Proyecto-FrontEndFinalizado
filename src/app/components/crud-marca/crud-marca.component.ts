import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {

  //Para la Grilla
  marcas: Marca[] = [];
  filtro: string = "";
  //Para los paises
  paises: Pais[] = [];
  //Json para registrar o actualizar
  marca: Marca = {
    pais: {
      idPais:-1
    }
  };

  //Declaracion de validaciones
  formsRegistraMarca = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{3,30}')]),
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{3,50}')]),
    validaFechaVigencia: new FormControl('',[Validators.required]),
    validaCertificado: new FormControl('', [Validators.required, Validators.pattern('[S][0-9]{8}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
  });

  formsActualizaMarca = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{3,30}')]),
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{3,50}')]),
    validaCertificado: new FormControl('', [Validators.required, Validators.pattern('[S][0-9]{8}')]),
    validaFechaVigencia: new FormControl('',[Validators.required]),
    validaPais: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  //para verificar que e pulsó el boton
  submitted = false;

  constructor(private paisService:PaisService, private marcaService:MarcaService) { 

    this.paisService.listaPais().subscribe(
      (x) => this.paises = x
    );
  }

  ngOnInit(): void {
  }

  consultaMarcaLike() {
    this.marcaService.listaMarcaLike(this.filtro == "" ? "todos" : this.filtro).subscribe(
      (x) => this.marcas = x
    );
  }

  actualizaEstado(aux: Marca) {
    aux.estado = aux.estado == 0 ? 1 : 0;
    this.marcaService.actualizaMarca(aux).subscribe();
  }

  registraMarca() {
    this.submitted = true;

    //finaliza el método si hay un error
    if (this.formsRegistraMarca.invalid) {
      return;
    }

    //this.marca.fechaVigencia=new Date();
    this.marcaService.registraMarca(this.marca).subscribe(     
      (x) => {
        //console.log(this.marca);
        this.marcaService.listaMarcaLike(this.filtro == "" ? "todos" : this.filtro).subscribe(         
          (x) => this.marcas = x
        );
        this.submitted = false;
        alert(x.mensaje);
      }
    );

    //limpiar los componentes del formulario a través de los ngModel
    this.marca = {
      idMarca: 0,
      nombre: "",
      descripcion: "",
      certificado: "",
      estado: 1,
      pais: {
        idPais:-1
      }
    }
  }

  buscarMarca(aux: Marca) {
    this.marca = aux;
  }

  actualizaMarca() {
    this.submitted = true;

    //finaliza el método si hay un error
    if (this.formsActualizaMarca.invalid) {
      return;
    }

    this.marcaService.actualizaMarca(this.marca).subscribe(
      (x) => {
        this.marcaService.listaMarcaLike(this.filtro == "" ? "todos" : this.filtro).subscribe(
          (x) => this.marcas = x
        );
        this.submitted = false;
        alert(x.mensaje);
      }
    );

    //limpiar los componentes del formulario a través de los ngModel
    this.marca = {
      idMarca: 0,
      nombre: "",
      descripcion: "",
      certificado: "",
      estado: 1,
      pais: {
        idPais:-1
      }
    }
  }

}
