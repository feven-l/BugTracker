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
  @Output() aTaskEventEmitter = new EventEmitter();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  dataFromChild(blah){
    console.log(blah);
    this.loggedout=blah;
    this.triggerEvent()
  }
  ngOnInit() {
    this.clicked = 0;
    this.clickLogin = false;
  }
  triggerEvent(){
    //  2b. Emit the Event
  this.aTaskEventEmitter.emit(false);
}
  goToSignUp(){
    this.clicked = 1;
   
  }
  loginhere(){
    this.clicked = 2;
    // this.triggerEvent()
  }

}
