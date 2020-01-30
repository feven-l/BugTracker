import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser : any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newUser = {firstName: "", lastName: "", email: "", password: ""};
  }
  createUser(newUser){
    let obs = this._httpService.createUser(newUser);
    obs.subscribe((data:any) => {
      if(status == "ok"){
        console.log("created new user!");
        this._router.navigate(['/tickets/login']);
      }
      else{
        console.log("error");
      }
    })
  }

}
