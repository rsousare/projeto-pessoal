import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrl: './project-delete.component.css'
})
export class ProjectDeleteComponent implements OnInit{

  project: Project = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    area: {id: null},
    areaId: ''
  }

  constructor(private service: ProjectService,
              private toast: ToastrService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.project.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  findById(): void {
    this.service.findById(this.project.id).subscribe(resposta => {
      this.project = {...resposta,
        area: resposta.area || {id: null}
      }
    })
  }

  delete(): void {
    this.service.delete(this.project.id).subscribe({
      next:(message: string) => {
        this.toast.success(message, 'Delete')
        this.router.navigate(['project'])
      },
      error: (ex: HttpErrorResponse) => {
        if(ex.status === 403) {
          this.toast.error('You do not have permission to perform this action')
        } else {
        this.toast.error(ex.error || 'An expected Error occurred')
        }
      }
    })
  }

  cancelar() {
    this.router.navigate(['/project'])
  }

}
