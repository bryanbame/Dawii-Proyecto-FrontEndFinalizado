import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Marca } from '../models/marca.model';


const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlMarca = AppSettings.API_ENDPOINT+ '/marca';


@Injectable({
  providedIn: 'root',
})
export class MarcaService {

  constructor(private http: HttpClient) {  }

  listaMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlUtil + '/listaMarca');
  }

  insertaMarca(data:Marca): Observable<any>{
    return this.http.post(baseUrlMarca, data);
  }

  consultaMarca(nombre:string, certificado:string, idPais:number, estado:number,fechaInicio:string,fechaFin:string):Observable<any>{
    
    const params = new HttpParams().set("nombre", nombre).set("certificado", certificado).set("idPais", idPais).set("estado", estado).set("fechaInicio", fechaInicio).set("fechaFin", fechaFin);

    return this.http.get<any>(baseUrlMarca+"/porNombreDescCertPaisConParametros", {params});
  }

}
