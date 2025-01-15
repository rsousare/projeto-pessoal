import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AreaService } from '../../services/area.service';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}],
})
export class ProjectCreateComponent implements OnInit{

  project: Project = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    area: {id: null},
    areaId: ''
  }
  areas: any[] = []

  name: FormControl = new FormControl(null, Validators.minLength(3))
  startDate: FormControl = new FormControl(null, Validators.required)
  endDate: FormControl = new FormControl(null, Validators.required)
  area: FormControl = new FormControl(null, Validators.required)

  constructor(private service: ProjectService,
              private toast: ToastrService,
              private router: Router,
              private areaService: AreaService
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0]
    this.startDate.setValue(today)
    this.loadAreas()
  }

  validaCampos(): boolean {
    return this.name.valid && this.startDate.valid && this.endDate.valid && this.area.valid
  }

  create(): void {

    if(!this.startDate.value) {
      this.project.startDate = new Date().toISOString().split('T')[0]
    } else {
      this.project.startDate = this.startDate.value
    }


    this.service.create(this.project).subscribe({
      next: (message: string) => {
      this.toast.success(message, 'Project Successfully Created')
      this.router.navigate(['project'])
      },
      error: (ex: HttpErrorResponse) => {
        if(ex.status === 400 && ex.error === 'The provided Area Id does not exist') {
          this.toast.error('The provided Area Id does not exist')
        } else if(ex.status === 400 && ex.error === 'Verify the field End Date') {
          this.toast.error('Verify the field End Date')
        } else if(ex.status === 403) {
          this.toast.error('You do not have permission to perform this action')
        } else {
          this.toast.error('An expected error occurred')
          }
        }
      })
  }

  cancelar() {
    this.router.navigate(['/project'])
  }

  loadAreas() {
    this.areaService.findAll().subscribe(
      (data) => {
        this.areas = data
      },
      (error) => {
        console.error('Error fetching areas: ', error)
      }
    );
  }
}
