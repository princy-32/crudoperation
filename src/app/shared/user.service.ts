import { Injectable } from '@angular/core';
import { loginUser, User } from './user.model';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
  
})
export class UserService {
  updateData(value: any) {
    throw new Error('Method not implemented.');
  }

   newUser : User = {

    name:'',
    email:'',
    contact:'',
    password:''
    

  }
  

   existingUser:loginUser={
     email:'',
     password:''
   }
  constructor(private http:HttpClient) { }

  addNewUser (user:User){

   return this.http.post(environment.apiBaseUrl +'newUser',user);

  }
  
  loginUser(verifyUser:loginUser)
  {
   return this.http.post('/',verifyUser);
  }

  getselectedUser(id:string)
  {
    return this.http.get(environment.apiBaseUrl+ 'SelectUser/'+id);
  }

  updateRecord (id:string){

    return this.http.post(environment.apiBaseUrl +'update/',+id);
 
   }

   deleteData(id:string){

    return this.http.post(environment.apiBaseUrl +'delete/',+id);
   }
  //store token variables
  setToken(token:string)
  {
    localStorage.setItem('token',token);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  removeToken()
  {
    localStorage.removeItem('token');
  }


  //user id stroage

  // setUserId(id:string)
  // {
  //   localStorage.setItem('userid',id);
  // }

  //Token verification

  getPayload()
  {
    var token=JSON.stringify(this.getToken());
    var userPayload=atob(token.split('.')[1]);
    if(userPayload)
    {
      return JSON.parse(userPayload);
    }
    else{
      return null;
    }

  }

  isLoggedIn()
  {
    var userpayload=this.getPayload();
    if(userpayload)
    {
      return userpayload.exp>Date.now()/1000;
    }
    else
    {
      return null;
    }
  }

  

}

