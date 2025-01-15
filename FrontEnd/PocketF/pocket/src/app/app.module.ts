import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import { NavComponent } from './components/nav/nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';
import { AreaListComponent } from './components/area/area-list/area-list.component';
import { MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Interceptor } from './interceptor/interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AreaCreateComponent } from './components/area/area-create/area-create.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AreaUpdateComponent } from './components/area/area-update/area-update.component';
import { AreaDeleteComponent } from './components/area/area-delete/area-delete.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';
import { PersonCreateComponent } from './components/person/person-create/person-create.component';
import { PersonUpdateComponent } from './components/person/person-update/person-update.component';
import { PersonDeleteComponent } from './components/person/person-delete/person-delete.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { MY_DATE_FORMATS, ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ProjectUpdateComponent } from './components/project/project-update/project-update.component';
import { ProjectDeleteComponent } from './components/project/project-delete/project-delete.component';
import { LoginComponent } from './components/login/login/login.component';
import { UserComponent } from './components/user/user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    AreaListComponent,
    AreaCreateComponent,
    AreaUpdateComponent,
    AreaDeleteComponent,
    PersonListComponent,
    PersonCreateComponent,
    PersonUpdateComponent,
    PersonDeleteComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    ProjectDeleteComponent,
    LoginComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxMaskDirective,
    NgxMaskPipe,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-PT'},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
