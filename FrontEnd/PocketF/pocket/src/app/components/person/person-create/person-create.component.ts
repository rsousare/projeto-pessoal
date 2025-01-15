import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/person';
import { FormControl, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.css'
})
export class PersonCreateComponent implements OnInit{

  person: Person = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    area: {id: null},
    areaId: ''
  }

  areas: any[] = []

  firstName: FormControl = new FormControl(null, Validators.minLength(3))
  lastName: FormControl = new FormControl(null, Validators.minLength(3))
  email: FormControl = new FormControl(null, [Validators.required, Validators.email])
  area: FormControl = new FormControl(null, Validators.required)

  constructor(private service: PersonService,
              private toast: ToastrService,
              private router: Router,
              private areaService: AreaService
  ) {}

  ngOnInit(): void {
    this.loadAreas()
  }

  validaCampos(): boolean {
    return this.firstName.valid && this.lastName.valid && this.email.valid && this.area.valid
  }

  // create(): void {
  //   this.service.create(this.person).subscribe(() => {
  //     this.toast.success('Person Successfully Created', 'Register')
  //     this.router.navigate(['person'])
  //   }, ex => {
  //     if(ex.error.errors) {
  //       ex.error.errors.forEach(element => {
  //         this.toast.error(element.message)
  //       })
  //     } else {
  //       this.toast.error(ex.error.message)
  //     }
  //   })
  // }

  create(): void {
    this.service.create(this.person).subscribe( {
      next: (message: string) => {
        this.toast.success(message, 'Person Successfully Created')
        this.router.navigate(['person'])
      },
      error: (ex: HttpErrorResponse) => {
        if(ex.status === 409) {
          this.toast.error(ex.error || 'This email is already registered')
        } else if(ex.status === 400 && ex.error === 'The provided Area ID does not exist') {
          this.toast.error('The provided Area ID does not exist')
        } else if(ex.status === 403) {
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

  loadAreas() {
    this.areaService.findAll().subscribe(
      (data) => {
        this.areas = data
      },
      (error) => {
        console.error('Error fetching areas: ', error)
      }
    )
  }
}
