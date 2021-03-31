import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(public userservice:UserService) { }

  // user: User = [];
    
   ngOnInit(): void {
   }
 
   onSubmit(F:NgForm)
   {
     console.log(F.value);
    this.userservice.updateRecord(F.value).subscribe((res)=>{
       console.log(res);
          },(err)=>{
            console.log(err);
     })
   }

}
