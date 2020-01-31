import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show-ticket',
  templateUrl: './show-ticket.component.html',
  styleUrls: ['./show-ticket.component.css']
})
export class ShowTicketComponent implements OnInit {
  oneTicket : any;
  secondTicket: any;
  TicketId : any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.TicketId = params['id'];
    })
    this.getTicket();
  }
  getTicket(){
    let obs = this._httpService.getTicket(this.TicketId);
    obs.subscribe((data:any) => {
      console.log(data);
      if(data){
        console.log("got a ticket!");
        this.oneTicket = data[0];
        this.secondTicket = data[1];
      }
      else{
        console.log("error");
      }
    })
  }
}
