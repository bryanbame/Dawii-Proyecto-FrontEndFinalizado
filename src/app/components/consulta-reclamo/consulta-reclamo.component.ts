import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {
  
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
  fechaRegistro :string = "";
  cboCliente :number=0;
  cboTipo : number = 0;
  estado : boolean =true;

  listaReclamos: Reclamo[]= [];

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

    consultaReclamo(){
      //alert(this.estado);
      this.reclamoService.consultaReclamo(this.fechaRegistro, this.cboCliente, this.cboTipo, this.estado?1:0).subscribe(
        rec => {
          this.listaReclamos =rec.lista;
          alert(rec.mensaje);
        }
      );
    }

  ngOnInit(): void {
  }

}
