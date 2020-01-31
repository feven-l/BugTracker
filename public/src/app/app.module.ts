import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GenericPageComponent } from './generic-page/generic-page.component';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { ShowTicketComponent } from './show-ticket/show-ticket.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTicketComponent,
    UpdateTicketComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    GenericPageComponent,
    ShowTicketComponent,
    UserListComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
