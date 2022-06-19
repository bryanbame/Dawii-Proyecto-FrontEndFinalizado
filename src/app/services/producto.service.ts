import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProducto = AppSettings.API_ENDPOINT+ '/producto';
const baseUrlProducto2 = AppSettings.API_ENDPOINT+ '/crudProducto';

const baseURL = "http://localhost:8090/url/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }


  registrar(data:Producto):Observable<any>{
    return this.http.post(baseUrlProducto, data);
  }

  listarMarca():Observable<any>{
    return this.http.get(baseUrlUtil+"/listaMarca")
  }

  listarPais():Observable<any>{
    return this.http.get(baseUrlUtil+"/listaPais")
  }

  consultaProducto(nombre:string, serie:string, idMarca:number, idPais:number, estado:number):Observable<any>{
    
    const params = new HttpParams().set("nombre", nombre).set("serie", serie).set("idMarca", idMarca).set("idPais", idPais).set("estado", estado);

    return this.http.get<any>(baseUrlProducto+"/filtroProductop", {params});
  }

  listaProducto(filtro:string): Observable<Producto[]>{
    return this.http.get<Producto[]>(baseUrlProducto2+"/listaProductoPorNombreLike/"+filtro);
  }

  registraProducto(aux:Producto):Observable<any>{
    return this.http.post<any>(baseUrlProducto2+"/registraProducto", aux);
  }

  actualizaProducto(aux:Producto):Observable<any>{
    return this.http.put<any>(baseUrlProducto2+"/actualizaProducto", aux);
  }

  eliminaProducto(id: any):Observable<any>{
    return this.http.delete(baseUrlProducto2+"/eliminaProducto/"+ id);
  }

}


