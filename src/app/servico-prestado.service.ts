import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiUrlBase + "/api/servico-prestado"

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: ServicoPrestado):Observable<ServicoPrestado>{
    return this.http.post<ServicoPrestado>(this.apiURL,servicoPrestado);
  }
}
