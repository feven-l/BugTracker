import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  allUsers: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
    let obs = this._httpService.getUsers();
    obs.subscribe((data:any) => {
      console.log(data);
      if(data){
        console.log("got all users!");
        this.allUsers = data;
      }
      else{
        console.log("error");
      }
    })
  }

}
