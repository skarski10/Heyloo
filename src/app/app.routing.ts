import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostComponent } from './host/host.component';
import { StudentComponent } from './student/student.component';

const appRoutes: Routes = [
{
  path: '',
  component: HostComponent
},
{
  path: '',
  component: StudentComponent
}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
