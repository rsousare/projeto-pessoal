import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Area } from '../../models/area';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Area[]> {
    return this.http.get<{data: Area[] }>(`${API_CONFIG.baseUrl}/areas`).pipe(
      map(response => response.data)
    );
  }

  // create(area: Area): Observable<Area> {
  //   return this.http.post<Area>(`${API_CONFIG.baseUrl}/areas`, area)
  // }
  create(area: Area): Observable<string> {
    return this.http.post<string>(`${API_CONFIG.baseUrl}/areas`, area, {
      responseType: 'text' as 'json'
    });
  }

  findById(id:any): Observable<Area> {
    return this.http.get<Area>(`${API_CONFIG.baseUrl}/areas/${id}`)
  }

  update(area: Area): Observable<Area> {
    return this.http.put<Area>(`${API_CONFIG.baseUrl}/areas/${area.id}`, area)
  }

  delete(id: any): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${API_CONFIG.baseUrl}/areas/${id}`, { observe: 'response' });
}

}
