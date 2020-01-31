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
  newComment: any;
  allComments: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.TicketId = params['id'];
    })
    this.newComment = {comment: "", Tickets_id : this.TicketId, commentCreatorId:1 };
    this.getTicket();
    this.getComments(this.TicketId);
  }
  createComment(newComment){
    newComment.Tickets_id = this.TicketId;
    let obs = this._httpService.createComment(newComment);
    obs.subscribe((data:any) => {
      console.log(data);
      if(data.status == "ok"){
        console.log("make a comment!");
        this.getComments(this.TicketId);
      }
      else{
        console.log("error");
      }
    })
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
  getComments(TicketId){
    let obs = this._httpService.getComments(TicketId);
    obs.subscribe((data:any) => {
      console.log(data);
      if(data){
        console.log("got comments!");
        this.allComments = data.data;
      }
      else{
        console.log("error");
      }
    })
  }
}
