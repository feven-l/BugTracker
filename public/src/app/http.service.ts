import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  createUser(newUser){
    return this._http.post('/users', newUser);
  }
  createTicket(newTicket){
    return this._http.post('/tickets', newTicket);
  }
  loginUser(checkUser){
    return this._http.get(`/userLogin/${checkUser.email}`);
  }
  createProject(newProject){
    return this._http.post('/projects', newProject);
  }
  getProjects(){
    return this._http.get('/projects');
  }
  getUsers(){
    return this._http.get('/users');
  }
  getTickets(){
    return this._http.get('/tickets');
  }
  getTicket(Ticketid){
    return this._http.get(`/tickets/${Ticketid}`);
  }
  constructor(private _http: HttpClient) { 
  }
}
