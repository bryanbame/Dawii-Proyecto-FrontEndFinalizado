import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlSede = AppSettings.API_ENDPOINT+ '/sede';

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


}
