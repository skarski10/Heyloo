import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostComponent } from './host/host.component';
import { StudentComponent } from './student/student.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';
import { StudentloadService } from './studentload.service';

const appRoutes: Routes = [
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'host/:id',
    component: HostComponent
  },
  {
    path: 'student/:roomcode/:studentid',
    component: StudentComponent,
    resolve: {
      studentObject: StudentloadService
    }
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
  providers: [
    StudentloadService
  ]
})

export class AppRoutingModule { }
// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
