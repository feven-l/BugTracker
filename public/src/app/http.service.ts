import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  createUser(newUser){
    return this._http.post('/users', newUser);
  }
  loginUser(checkUser){
    return this._http.post('/userLogin', checkUser);
  }
  constructor(private _http: HttpClient) { 
  }
}
