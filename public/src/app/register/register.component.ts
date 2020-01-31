import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser : any;
  @Output() aTaskEventEmitter = new EventEmitter();

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.newUser = {firstName: "", lastName: "", email: "", password: ""};
  }
  triggerEvent(){
    //  2b. Emit the Event
    this.aTaskEventEmitter.emit(false); //we can pass in any data type
  }
  createUser(newUser){
    let obs = this._httpService.createUser(newUser);
    obs.subscribe((data:any) => {
      console.log(data.status);
      if(data.status == "ok"){
        console.log("created new user!");
        this._router.navigate(['/dashboard']);
        this.triggerEvent();        
      }
      else{
        console.log("error");
      }
    })
  }
  

}
