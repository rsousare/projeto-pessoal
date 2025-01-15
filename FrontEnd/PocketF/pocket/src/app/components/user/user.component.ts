import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  // user: User = {
  //   id: '',
  //   email: '',
  //   password: '',
  //   userType: []
  // }

  useForm: FormGroup

  constructor(private toast: ToastrService,
              private router: Router,
              private service: UsersService,
              private fb: FormBuilder
  ) {
    this.useForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3),
                     Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{3,}$/)]],
      userTypeId: [[], Validators.required]
    })
  }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.useForm.valid
  }

  cancelar() {
    this.router.navigate(['/login'])
  }


  addPerfil(perfil: number, isChecked: boolean): void {
    if (isChecked) {
        this.useForm.get('userTypeId')?.setValue(perfil);
    } else {
        this.useForm.get('userTypeId')?.setValue(null);
    }
}

  create() {
    if(this.useForm.valid) {
      const user: User = this.useForm.value
      this.service.create(user).subscribe({
        next: (response) => {
          console.log('Response ', response)
          this.toast.success(response, 'User Successfully created')
          this.router.navigate(['/login'])
        },
        error: (ex: HttpErrorResponse) => {
                if(ex.status === 409) {
                  this.toast.error(ex.error || 'This Email is already registered')
                }else {
                  this.toast.error('An expected error occurred')
                }
              }
      })
    }
  }

}
