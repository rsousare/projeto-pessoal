import { Component, OnInit } from '@angular/core';
import { Area } from '../../../models/area';
import { AreaService } from '../../services/area.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-area-delete',
  templateUrl: './area-delete.component.html',
  styleUrl: './area-delete.component.css'
})
export class AreaDeleteComponent implements OnInit{
  area: Area = {
        id: '',
        name: '',
        description: '',
      }

      constructor(private service: AreaService,
                  private toast: ToastrService,
                  private router: Router,
                  private route: ActivatedRoute
      ) {}

      ngOnInit(): void {
        this.area.id = this.route.snapshot.paramMap.get('id')
        this.findById()
      }

      findById(): void {
        this.service.findById(this.area.id).subscribe(resposta => {
          this.area = resposta
        })
      }


delete(): void {
    this.service.delete(this.area.id).subscribe({
        next: (response: HttpResponse<any>) => {
            const successMessage = response.headers.get('X-Success-Message');
            if (successMessage) {
                this.toast.success(successMessage, 'Delete');
            } else {
                this.toast.success('Area successfully deleted', 'Delete');
            }
            this.router.navigate(['area']);
        },
        error: (ex: HttpErrorResponse) => {
          if(ex.status === 403) {
            this.toast.error('You do not have permission to perform this action')
          } else {
            const errorMessage = ex.headers?.get('X-Error-Message') || 'Unexpected error occurred';
            this.toast.error(errorMessage, 'Error');
          }
        }
    });
}



      cancelar() {
        this.router.navigate(['/area'])
      }
}
