import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  userName: string = ''

  constructor(private router: Router,
              private authService: AuthService,
              private toast: ToastrService){}
  ngOnInit(): void {
    this.router.navigate(['home'])
    const user = localStorage.getItem('user')
    this.userName = user ? JSON.parse(user).email : null
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout()
    this.toast.info('Successful logout', 'Logout', {timeOut: 7000})
  }

}
