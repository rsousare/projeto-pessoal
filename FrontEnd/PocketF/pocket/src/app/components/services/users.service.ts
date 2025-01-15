import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  create(user: User): Observable<string> {
      return this.http.post<string>(`${API_CONFIG.baseUrl}/users/create`, user, {
        responseType: 'text' as 'json'
      });
    }
}
