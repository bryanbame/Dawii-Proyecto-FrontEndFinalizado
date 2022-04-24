import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ReclamoService } from 'src/app/services/reclamo.service';

@Component({
  selector: 'app-registra-reclamo',
  templateUrl: './registra-reclamo.component.html',
  styleUrls: ['./registra-reclamo.component.css']
})
export class RegistraReclamoComponent implements OnInit {

  tReclamo: TipoReclamo[]=[];
  cliente : Cliente[]=[];
  reclamo : Reclamo={
    tipoReclamo:{
      idTipoReclamo:-1
     },
     cliente:{ 
       idCliente:-1
     }

   }


  constructor(private reclamoService:ReclamoService) { 
        reclamoService.listarTipoReclamo().subscribe(r=>{
          this.tReclamo=r;
         });
         reclamoService.listarCliente().subscribe(c=>{
           this.cliente=c;
         })
  }

  ngOnInit(): void {
  }


  registrarReclamo(){
    this.reclamoService.registrarReclamo(this.reclamo).subscribe(
      response =>{
        alert(response.mensaje);
      },
      error =>{
        alert(error);
      }
    );
  }


}
