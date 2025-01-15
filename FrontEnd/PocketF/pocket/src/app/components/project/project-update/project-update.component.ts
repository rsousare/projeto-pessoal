import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrl: './project-update.component.css'
})
export class ProjectUpdateComponent implements OnInit{

  project: Project = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    area: {id: null},
    areaId: ''
  }

  name: FormControl = new FormControl(null, Validators.minLength(3))
  startDate: FormControl = new FormControl(null, Validators.required)
  endDate: FormControl = new FormControl(null, Validators.required)
  area: FormControl = new FormControl(null, Validators.required)

  constructor(private service: ProjectService,
              private toast: ToastrService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.project.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  validaCampos(): boolean {
    return this.name.valid && this.endDate.valid && this.area.valid
  }

  findById(): void {
    this.service.findById(this.project.id).subscribe(resposta => {
      this.project = {...resposta,
        area: resposta.area || {id: null}
      }
    })
  }

  update(): void {

    if(this.project.areaId) {
      this.project.area = {id: this.project.areaId}
    }

    this.service.update(this.project).subscribe({
      next: (message: string) => {
      this.toast.success(message,'Project Successfully Updated')
      this.router.navigate(['project'])
      },
       error: (ex: HttpErrorResponse) => {
        console.log('Erro da api: ', ex)
        if(ex.status === 400 && ex.error === 'The provided Area Id does not exist') {
            this.toast.error('The provided Area Id does not exist')
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

}
