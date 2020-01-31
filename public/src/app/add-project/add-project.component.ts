import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  newProject: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newProject = {
      projectName: "",
      projectDescription: "",
      projectDueDate: 9999-4-21,
      projectPriority: "",
      creatorId: 1,
    }
  };
    
    createProject(newProject){
      console.log(newProject);
      let obs = this._httpService.createProject(newProject);
      obs.subscribe((data:any) => {
        console.log(data);
        if(data.status == "ok"){
          console.log("created new project!");
          this._router.navigate(['']);
        }
        else{
          console.log("error");
        }
      })
  }

}
