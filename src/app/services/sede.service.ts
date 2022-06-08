import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlSede = AppSettings.API_ENDPOINT+ '/sede';
const baseUrlSede2 = AppSettings.API_ENDPOINT+ '/crudSede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }

    insertaSede(data:Sede):Observable<any>{
      return this.http.post(baseUrlSede, data);
    }

    consultaSede(nombre:string, direccion:string, estado:number, codigoPostal:string, idPais:number):Observable<any>{
      const params = new HttpParams().set("nombre",nombre).set("direccion",direccion).set("estado",estado).set("codigoPostal",codigoPostal).set("idPais",idPais);
      return this.http.get<any>(baseUrlSede+"/porNomDirEstPostPaisConParametros",{params});
    }

    listaSede(filtro:string): Observable<Sede[]>{
      return this.http.get<Sede[]>(baseUrlSede2+"/listaSedePorNombreLike/"+filtro);
    }

    registraSede(aux:Sede):Observable<any>{
      return this.http.post<any>(baseUrlSede2+"/registraSede", aux);
    }

    actualizaSede(aux:Sede):Observable<any>{
      return this.http.put<any>(baseUrlSede2+"/actualizaSede", aux);
    }

    eliminaSede(id: any):Observable<any>{
      return this.http.delete(baseUrlSede2+"/eliminaSede/"+ id);
    }
}
