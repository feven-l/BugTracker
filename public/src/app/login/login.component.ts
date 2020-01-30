import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  checkUser : any;
  inSession: number;
  constructor(
    // private _updateSession: AppComponent,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkUser = {email: "", password: ""};
    this.inSession = 0;
  }
  userLogin(checkUser){
    let obs = this._httpService.loginUser(checkUser);
    obs.subscribe((data:any) => {
      console.log(data)
      if(data.email){
        console.log("logged in user!");
        this.inSession = data.id;
        // this._updateSession.getSession(this.inSession);
        console.log(this.inSession);
        // this._router.navigate(['']);
        this._router.navigate(['/dashboard']);
            }
      else{
        console.log("error");
      }
    })
  }

}
