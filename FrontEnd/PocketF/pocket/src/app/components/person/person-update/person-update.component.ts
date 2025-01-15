import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/person';
import { PersonService } from '../../services/person.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { errors } from 'undici-types';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrl: './person-update.component.css'
})
export class PersonUpdateComponent implements OnInit{

  person: Person = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      area: {id: null},
      areaId: ''
    }

      firstName: FormControl = new FormControl(null, Validators.minLength(3))
      lastName: FormControl = new FormControl(null, Validators.minLength(3))
      email: FormControl = new FormControl(null, Validators.minLength(3))
      area: FormControl = new FormControl(null, Validators.minLength(1))

    constructor(private service: PersonService,
                private toast: ToastrService,
                private router: Router,
                private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.person.id = this.route.snapshot.paramMap.get('id')
      this.findById()
    }

    validaCampos(): boolean {
      return this.firstName.valid && this.lastName.valid && this.email.valid && this.area.valid
    }

    findById(): void {
        this.service.findById(this.person.id).subscribe(resposta => {
        this.person = {...resposta,
          area:resposta.area || {id: null}
        }
      })
    }

    update(): void {

      if(this.person.areaId) {
        this.person.area = {id: this.person.areaId}
      }

      this.service.update(this.person).subscribe({
        next: (message: string) => {
        this.toast.success(message, 'Person Successfully Updated')
        this.router.navigate(['person'])
      },
       error: (ex: HttpErrorResponse) => {
        if(ex.status === 400 && ex.error === 'The provided Area Id does not exist') {
            this.toast.error('The provided Area Id does not exist')
        } else if(ex.status === 409) {
          this.toast.error(ex.error || 'This email is already registered')
        }else if(ex.status === 403) {
          this.toast.error('You do not have permission to perform this action')
        } else {
          this.toast.error('An expected error occurred')
          }
        }
      })
    }

    cancelar() {
      this.router.navigate(['/person'])
    }


}
