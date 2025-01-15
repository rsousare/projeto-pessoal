import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Person } from '../../models/person';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Person[]> {
    return this.http.get<{data: Person[]}>(`${API_CONFIG.baseUrl}/people`).pipe(
      map(response => response.data)
    );
  }

  findById(id: any): Observable<Person> {
    return this.http.get<Person>(`${API_CONFIG.baseUrl}/people/${id}`)
  }


  // create(person: Person): Observable<any> {
  //   return this.http.post(`${API_CONFIG.baseUrl}/people`, person, {
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // }

  create(person: Person): Observable<string> {
    return this.http.post<string>(`${API_CONFIG.baseUrl}/people`, person, {
      responseType: 'text' as 'json'
    });
  }

  update(person: Person): Observable<string> {
    return this.http.put<string>(`${API_CONFIG.baseUrl}/people/${person.id}`, person, {
      responseType: 'text' as 'json'
    })
  }

  // delete(id: any): Observable<HttpResponse<any>> {
  //   return this.http.delete<HttpResponse<any>>(`${API_CONFIG.baseUrl}/people/${id}`, {observe: 'response'})
  // }


  delete(id: any): Observable<string> {
    return this.http.delete<string>(`${API_CONFIG.baseUrl}/people/${id}`, {
      responseType: 'text' as 'json'
    })
  }

}
