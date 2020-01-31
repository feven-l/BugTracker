import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { GenericPageComponent } from './generic-page/generic-page.component';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component';
import { ShowTicketComponent } from './show-ticket/show-ticket.component';


const routes: Routes = [
  { path: 'welcome', component: GenericPageComponent},
  { path: '', component: DashboardComponent},
  { path: 'tracker/ticket/new', component: AddTicketComponent},
  { path: 'tracker/project/new', component: AddProjectComponent},
  { path: 'tracker/ticket/:id/edit', component: UpdateTicketComponent},
  { path: 'tracker/welcome', component: GenericPageComponent},
  { path: 'tracker/signup', component: RegisterComponent},
  { path: 'tracker/signin', component: LoginComponent},
  { path: 'tracker/ticket/:id', component: ShowTicketComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
