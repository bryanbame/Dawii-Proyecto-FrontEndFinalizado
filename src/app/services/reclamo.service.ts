import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlReclamo = AppSettings.API_ENDPOINT+ '/reclamo';
const baseUrl = AppSettings.API_ENDPOINT+ '/crudReclamo';


@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private http:HttpClient) {   }


  registrarReclamo(data:Reclamo): Observable<any>{
    return this.http.post(baseUrlReclamo, data);
  }


  listarTipoReclamo():Observable<any>{
    return this.http.get(baseUrlUtil+"/listaTipoReclamo")
  }

  listarCliente():Observable<any>{
    return this.http.get(baseUrlUtil+"/listaCliente")
  }

  consultaReclamo(fec:string, cli:number, tip:number, est:number): Observable<any>{
    const params= new HttpParams()
    .set("fechaRegistro", fec)
    .set("idCliente", cli)
    .set("idTipoReclamo", tip)
    .set("estado", est);
    return this.http.get(baseUrlReclamo +"/ConsultaReclamoConParametros",{params})
  }

  listaReclamo(filtro:string):Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(baseUrl + "/listaReclamoPorDescripcioLike/"+ filtro);
}  

registraReclamo(obj: Reclamo): Observable<any>{
    return this.http.post(baseUrl+ "/registraReclamo", obj);
}

actualizaReclamo(obj: Reclamo): Observable<any>{
  return this.http.put(baseUrl + "/actualizaReclamo", obj);
}
}
