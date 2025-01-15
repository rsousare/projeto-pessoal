import { Component, OnInit } from '@angular/core';
import { Area } from '../../../models/area';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../../services/area.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-area-update',
  templateUrl: './area-update.component.html',
  styleUrl: './area-update.component.css'
})
export class AreaUpdateComponent implements OnInit{
  area: Area = {
      id: '',
      name: '',
      description: '',
    }

    name: FormControl = new FormControl(null, Validators.minLength(3))
    description: FormControl = new FormControl(null, Validators.minLength(3))

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

    validaCampos(): boolean {
      return this.name.valid && this.description.valid
    }

    update(): void {
      this.service.update(this.area).subscribe(()=> {
      this.toast.success('Area successfully updated', 'Update')
      this.router.navigate(['area'])
    }, ex => {
      //console.log(ex)
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error((element.message))
          })
        }else {
          this.toast.error(ex.error.message)
        }
      })
    }

    cancelar() {
      this.router.navigate(['/area'])
    }
}
