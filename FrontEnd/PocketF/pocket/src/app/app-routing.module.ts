import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AreaListComponent } from './components/area/area-list/area-list.component';
import { AreaCreateComponent } from './components/area/area-create/area-create.component';
import { AreaUpdateComponent } from './components/area/area-update/area-update.component';
import { AreaDeleteComponent } from './components/area/area-delete/area-delete.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';
import { PersonCreateComponent } from './components/person/person-create/person-create.component';
import { PersonUpdateComponent } from './components/person/person-update/person-update.component';
import { PersonDeleteComponent } from './components/person/person-delete/person-delete.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ProjectUpdateComponent } from './components/project/project-update/project-update.component';
import { ProjectDeleteComponent } from './components/project/project-delete/project-delete.component';
import { LoginComponent } from './components/login/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: UserComponent},


  {path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent},

    {path: 'area', component: AreaListComponent},
    {path: 'area/create', component: AreaCreateComponent},
    {path: 'area/update/:id', component: AreaUpdateComponent},
    {path: 'area/delete/:id', component: AreaDeleteComponent},

    {path: 'person', component: PersonListComponent},
    {path: 'person/create', component: PersonCreateComponent},
    {path: 'person/update/:id', component: PersonUpdateComponent},
    {path: 'person/delete/:id', component: PersonDeleteComponent},

    {path: 'project', component: ProjectListComponent},
    {path: 'project/create', component: ProjectCreateComponent},
    {path: 'project/update/:id', component: ProjectUpdateComponent},
    {path: 'project/delete/:id', component: ProjectDeleteComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
