import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../../models/credenciais';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username: string | null = null
  private password: string | null = null

  constructor(private http: HttpClient,
              private router: Router) { }


  login(creds: Credenciais): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(creds.email + ':' + creds.senha)
    })
    // console.log(creds.email, creds.senha)
    // console.log(headers)
    return this.http.get(`${API_CONFIG.baseUrl}/api/login`, {headers}).pipe(
      tap((response: any) => {
        localStorage.setItem('auth', btoa(`${creds.email}:${creds.senha}`))
        localStorage.setItem('user', JSON.stringify(response))
      })
    )
  }

  getLoggedUser(): string | null {
    return localStorage.getItem('user')
  }

  logout() {
    localStorage.removeItem('authToken')
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user')
    return user !== null && user !== ''
  }

  setCredentials(username: string, password: string): void {
    this.username = username
    this.password = password
    localStorage.setItem('auth', btoa('`${username}:${password}`'))
  }

  getCredentials():string | null {
    return localStorage.getItem('auth')
  }

  clearCredentials(): void {
    this.username = null
    this.password = null
    localStorage.removeItem('auth')
  }
}
