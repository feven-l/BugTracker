import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { GenericPageComponent } from './generic-page/generic-page.component';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: GenericPageComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'tracker/ticket/new', component: AddTicketComponent},
  { path: 'tracker/project/new', component: AddProjectComponent},
  { path: 'tracker/ticket/:id/edit', component: UpdateTicketComponent},
  { path: 'tracker/welcome', component: GenericPageComponent},
  { path: 'tracker/signup', component: RegisterComponent},
  { path: 'tracker/signin', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
