import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

const routes: Routes = [
  { path: 'companies', component: CompanyListComponent },
  { path: 'companies/create', component: CompanyFormComponent },
  { path: 'companies/edit/:id', component: CompanyFormComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/create', component: DepartmentFormComponent },
  { path: 'departments/edit/:id', component: DepartmentFormComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/create', component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },
  { path: '', redirectTo: '/companies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
