import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  newTicket : any;
  allProjects : any;
  allUsers : any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newTicket = {ticketName: "",
     ticketType: "",
     ticketDescription: "", 
     ticketPriority: "", 
     ticketDueDate: "", 
     ticketStatus: "", 
     Projects_id: "", Projects_creatorId: 1, ticketCreatorId: 3, assignedUserId: "" },
     this.getProjects();
     this.getUsers();
  }
  createTicket(newTicket){
    console.log(newTicket);
    let obs = this._httpService.createTicket(newTicket);
    obs.subscribe((data:any) => {
      if(data.status == "ok"){
        console.log("created new ticket!");
        this._router.navigate(['']);
      }
      else{
        console.log("error");
      }
    })
  }
  getProjects(){
    let obs = this._httpService.getProjects();
    obs.subscribe((data:any) => {
      console.log(data);
      if(data){
        console.log("got all projects!");
        this.allProjects = data;
      }
      else{
        console.log("error");
      }
    })
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
