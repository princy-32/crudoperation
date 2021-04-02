import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public userservice:UserService,
    private router:Router) { }

  showmessage=false;
  errorMessage=false;
  error:string='';
  id:string='';

  resData:any=[];

  ngOnInit(): void {
  }


  login(f:NgForm)
  {
    console.log(f.value);
    this.userservice.loginUser(f.value).subscribe((res)=>{
      console.log(res);
      this.showmessage=true;
      this.resData = res;
     // console.log(this.resData.token);
     this.userservice.setToken(this.resData.token);
       this.id=this.resData.data._id;
      // this.router.navigateByUrl('/profile');
  this.router.navigate(['/profile'],{"queryParams":{id:this.id}})

 this.showmessage=true;
    },
    (err)=>{

      this.errorMessage=true;
      this.error=err;
      console.log(err);
    })
  }

}
