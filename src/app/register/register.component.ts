import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userservice:UserService,
    private router : Router) { }

 // user: User = [];
   
  ngOnInit(): void {
  }

  onSubmit(F:NgForm)
  {
    console.log(F.value);
   this.userservice.addNewUser(F.value).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl('/login')
         },(err)=>{
           console.log(err);
    })
  }

}


