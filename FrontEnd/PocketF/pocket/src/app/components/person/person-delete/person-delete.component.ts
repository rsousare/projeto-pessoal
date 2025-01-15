import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/person';
import { PersonService } from '../../services/person.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrl: './person-delete.component.css'
})
export class PersonDeleteComponent implements OnInit{

  person: Person = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      area: {id: null},
      areaId: ''
    }

  constructor(private service: PersonService,
              private toast: ToastrService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.person.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  findById(): void {
    this.service.findById(this.person.id).subscribe(resposta => {
      this.person = {...resposta,
        area: resposta.area || {id: null}
      }
    })
  }


  // delete(): void {
  //   this.service.delete(this.person.id).subscribe(() => {
  //     this.toast.success('Person Successfully Deleted', 'Delete')
  //     this.router.navigate(['person'])
  //   }, ex => {
  //     console.error('Delete error ', ex)
  //     if(ex.error.errors) {
  //       ex.error.errors.forEach(element => {
  //         this.toast.error(element.message)
  //       })
  //     } else {
  //       this.toast.error(ex.error.message)
  //     }
  //   })
  // }

  delete(): void {
    this.service.delete(this.person.id).subscribe( {
      next: (message: string) => {
        this.toast.success(message, 'Delete')
        this.router.navigate(['person'])
      },
      error: (ex: HttpErrorResponse) => {
        if(ex.status === 403) {
          this.toast.error('You do not have permission to perform this action')
        } else {
        this.toast.error(ex.error || 'An expected error occurred')
        }
      }
    })
  }

  cancelar() {
    this.router.navigate(['/person'])
  }

}
