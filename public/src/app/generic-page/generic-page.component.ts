import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.css']
})
export class GenericPageComponent implements OnInit {
  clicked: Number;
  clickLogin: boolean;
  loggedout:any;
  userId:any;
  @Output() aTaskEventEmitter = new EventEmitter();
  @Output() UserIdEmitter = new EventEmitter();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  dataFromChild(ublah){
    console.log(ublah.loggedOut+" loginfo");
    console.log(ublah.id+" userid");
    this.loggedout=ublah.loggedOut;
    this.userId=ublah.id
    this.triggerEvent()
  }
  ngOnInit() {
    this.clicked = 0;
    this.clickLogin = false;
  }
  triggerEvent(){
    this.aTaskEventEmitter.emit({id:this.userId, loggedOut:this.loggedout});
    // this.aTaskEventEmitter.emit(false);
}
  goToSignUp(){
    this.clicked = 1;
   
  }
  loginhere(){
    this.clicked = 2;
    // this.triggerEvent()
  }

}
