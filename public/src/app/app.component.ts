import { Component, OnInit, Injectable, Input } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginComponent]
})
export class AppComponent implements OnInit{
  title = 'public';
  loggedout : boolean;
  // inSession: any;

  constructor(
    private _session : LoginComponent,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  dataFromChild(blah){
    console.log(blah);
    this.loggedout=blah;
  }
  ngOnInit(){
    this.loggedout = true;
    // console.log(this.inSession);
  }
  loggedin(){
    this.loggedout=false
  }
}
