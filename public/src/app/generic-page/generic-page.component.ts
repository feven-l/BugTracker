import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.css']
})
export class GenericPageComponent implements OnInit {
  clicked: Number;
  clickLogin: boolean;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.clicked = 0;
    this.clickLogin = false;
  }
  goToSignUp(){
    this.clicked = 1;
  }
  loginhere(){
    this.clicked = 2;
  }

}
