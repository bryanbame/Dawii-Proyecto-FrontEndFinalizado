import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {
  clientes:Cliente[]=[];
  tipoReclamos:TipoReclamo[]=[];

  reclamo:Reclamo={
    cliente:{
      idCliente: 0
    },
    tipoReclamo:{
      idTipoReclamo: 0
    }
  }

  listaReclamos: Reclamo[]= [];
  filtro: string ="";

  constructor(private clienteService:ClienteService,
    private tipoReclamoService:TipoReclamoService,
    private reclamoService:ReclamoService) { 
      this.clienteService.listaCliente().subscribe(
        (c) => this.clientes = c
      ),
      this.tipoReclamoService.listaTipoReclamo().subscribe(
        (t) => this.tipoReclamos = t
      )
    }


  ngOnInit(): void {
  }

  consulta(){
    this.reclamoService.listaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.listaReclamos = x
    );
}
actualizaEstado(aux : Reclamo){
  aux.estado = aux.estado == 0? 1 :0;
  this.reclamoService.actualizaReclamo(aux).subscribe();
}
registra(){
  this.reclamoService.registraReclamo(this.reclamo).subscribe(
        (x) => {
          document.getElementById("btn_reg_cerrar")?.click();
          alert(x.mensaje);
          this.reclamoService.listaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
            (x) => this.listaReclamos = x
      );
        } 
  );



  //limpiar los componentes del formulario a través de los ngModel

  this.reclamo = { 
        idReclamo:0,
        descripcion:"",
        
        estado:1,
        cliente:{
          idCliente: -1
        },
        tipoReclamo:{
          idTipoReclamo: -1
        }
  };
}

buscar(aux :Reclamo){
  this.reclamo  = aux;
}

actualiza(){
  this.reclamoService.actualizaReclamo(this.reclamo).subscribe(
        (x) => {
          document.getElementById("btn_act_cerrar")?.click();
          alert(x.mensaje);
          this.reclamoService.listaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
            (x) => this.listaReclamos = x
            );
        } 
  );

   //limpiar los componentes del formulario a través de los ngModel

   this.reclamo = { 
    idReclamo:0,
    descripcion:"",
    
    estado:1,
    cliente:{
      idCliente: -1
    },
    tipoReclamo:{
      idTipoReclamo: -1
    }
  };
}

}
