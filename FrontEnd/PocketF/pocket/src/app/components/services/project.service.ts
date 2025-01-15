import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from '../../models/project';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Project> {
    return this.http.get<Project>(`${API_CONFIG.baseUrl}/projects/${id}`)
  }

  findAll(): Observable<Project[]> {
    return this.http.get<{data: Project[]}>(`${API_CONFIG.baseUrl}/projects`).pipe(
      map(response => response.data)
    )
  }

  create(project: Project): Observable<string> {
    return this.http.post<string>(`${API_CONFIG.baseUrl}/projects`, project, {
      responseType: 'text' as 'json'
    })
  }

  update(project: Project): Observable<string> {
    return this.http.put<string>(`${API_CONFIG.baseUrl}/projects/${project.id}`, project, {
      responseType: 'text' as 'json'
    })
  }

  delete(id: any):Observable<string> {
    return this.http.delete<string>(`${API_CONFIG.baseUrl}/projects/${id}`, {
      responseType: 'text' as 'json'
    })
  }
}
