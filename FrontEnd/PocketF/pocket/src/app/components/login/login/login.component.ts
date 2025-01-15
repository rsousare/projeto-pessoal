import { Component, OnInit } from '@angular/core';
import { Credenciais } from '../../../models/credenciais';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  creds: Credenciais = {
    email: '',
    senha: ''
  }


  email = new FormControl(null, Validators.email)
  senha = new FormControl(null, Validators.minLength(3))

  constructor(private toast: ToastrService,
              private service: AuthService,
              private router: Router
  ) {}
  ngOnInit(): void {

  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }


  // register() {
  //   this.service.register(this.creds.email, this.creds.senha, this.creds.userTypeId).subscribe({
  //     next: (response) => {
  //       alert('Usuário registrado com sucesso! Tente fazer login novamente')
  //       console.log(response)
  //     },
  //     error: (err) => {
  //       alert('Erro ao registrar usuário!')
  //       console.log(err)
  //     }
  //   })
  // }

  onLogin() {

    const authCredentials = btoa(this.creds.email + ":" + this.creds.senha);

    this.service.login(this.creds).subscribe({
      next: (response) => {
        if (response.message === 'Successful Login') {
          localStorage.setItem('authToken', authCredentials);
          localStorage.setItem('user', JSON.stringify(response));
          this,this.toast.success('Successful Login')
          this.router.navigate(['/home']);
        } else {
          this.toast.error('Login failed. Verify your credentials')
        }
      },
      error: (error) => {
        this.toast.error('Login failed. Verify your credentials')
        //console.error('Error:', error);
      },
    });
  }

}
