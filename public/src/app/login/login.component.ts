import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { EventEmitter } from 'protractor';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  checkUser : any;
  // inSession: number;
  @Output() aTaskEventEmitter = new EventEmitter();
  
  constructor(
    // private _updateSession: AppComponent,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  ngOnInit() {
    this.checkUser = {email: "", password: ""};
  }
    triggerEvent(){
      //  2b. Emit the Event
      this.aTaskEventEmitter.emit(false); //we can pass in any data type
    }
  userLogin(checkUser){
    // this.triggerEvent();
    // this._router.navigate(['/dashboard']);

    let obs = this._httpService.loginUser(checkUser);
    obs.subscribe((data:any) => {
      console.log(data)
      if(data && data.password==checkUser.password){
        console.log("logged in user!");
        // this.inSession = data.id;
        // this._updateSession.getSession(this.inSession);
        // console.log(this.inSession);
        // this._router.navigate(['']);
        this.triggerEvent();
        this._router.navigate(['/dashboard']);
            }
      else{
        console.log("error");
      }
    })
  }

}
