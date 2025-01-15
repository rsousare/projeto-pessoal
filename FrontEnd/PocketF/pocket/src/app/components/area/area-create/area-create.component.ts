import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AreaService } from '../../services/area.service';
import { Area } from '../../../models/area';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-area-create',
  templateUrl: './area-create.component.html',
  styleUrl: './area-create.component.css'
})
export class AreaCreateComponent implements OnInit{

  area: Area = {
    id: '',
    name: '',
    description: '',
  }

  name: FormControl = new FormControl(null, Validators.minLength(3))
  description: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(private service: AreaService,
              private toast: ToastrService,
              private router: Router
  ) {}

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.name.valid && this.description.valid
  }

  // create(): void {
  //   this.service.create(this.area).subscribe(()=> {
  //   this.toast.success('Area successfully registered', 'Register')
  //   this.router.navigate(['area'])
  // }, ex => {
  //   //console.log(ex)
  //   if(ex.error.errors) {
  //     ex.error.errors.forEach(element => {
  //       this.toast.error((element.message))
  //       })
  //     }else {
  //       this.toast.error(ex.error.message)
  //     }
  //   })
  // }

  create(): void {
      this.service.create(this.area).subscribe( {
        next: (message: string) => {
          this.toast.success(message, 'Area Successfully Created')
          this.router.navigate(['area'])
        },
        error: (ex: HttpErrorResponse) => {
          if(ex.status === 403) {
            this.toast.error('You do not have permission to perform this action')
          } else {
          this.toast.error('An expected error occurred')
          }
        }
      })
    }

  cancelar() {
    this.router.navigate(['/area'])
  }

  // addPerfil(perfil: any): void {
  //   if(this.area.perfis.includes(perfil)) {
  //     this.area.perfis.splice(this.area.perfis.indexOf(perfil), 1)
  //     console.log(this.area.perfis)
  //   } else {
  //     this.area.perfis.push(perfil)
  //     console.log(this.area.perfis)
  //   }
  // }

}
