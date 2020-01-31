import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allTickets : any;
  TicketId : any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getTickets();
   
  }
  getTickets(){
    let obs = this._httpService.getTickets();
    obs.subscribe((data:any) => {
      console.log(data);
      if(data){
        console.log("got all projects!");
        this.allTickets = data;
      }
      else{
        console.log("error");
      }
    })
  }
}
