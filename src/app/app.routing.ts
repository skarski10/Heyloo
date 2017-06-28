import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostComponent } from './host/host.component';
import { StudentComponent } from './student/student.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';
import { StudentloadService } from './studentload.service';

// @NgModule({
//   imports: [ routing.forRoot(routes)],
//   exports: [ routing ],
//   providers: [
//     StudentloadService
//   ]
// })
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

// export class routing { }
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
