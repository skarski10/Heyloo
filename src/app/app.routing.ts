import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostComponent } from './host/host.component';
import { StudentComponent } from './student/student.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';

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
  component: StudentComponent
},
{
  path: 'register',
  component: RegisterComponent
}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
