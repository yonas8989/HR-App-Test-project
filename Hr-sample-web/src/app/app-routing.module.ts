import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';

const routes: Routes = [
  { path: 'companies', component: CompanyListComponent },
  { path: 'companies/create', component: CompanyFormComponent },
  { path: 'companies/edit/:id', component: CompanyFormComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/create', component: DepartmentFormComponent },
  { path: 'departments/edit/:id', component: DepartmentFormComponent },
  { path: '', redirectTo: '/companies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
