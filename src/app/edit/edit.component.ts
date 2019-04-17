import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register2Service } from '../services/register2.service';
import { RegisterModel } from '../models/registermodel';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 
  rObj: RegisterModel;
  
  register:RegisterModel;
  constructor(private acr:ActivatedRoute,private rService:Register2Service,private rtr:Router) { 
    this.register= new RegisterModel();
  }

  ngOnInit() {
    let i: string = this.acr.snapshot.params.username
    this.rService.getbyusername(i).subscribe((result) => {
     
      this.register.fname = result[0].fname;
       this.register.lname = result[0].lname;
       this.register.username = result[0].u_sername;
      this.register.password=result[0].password;
       this.register.email = result[0].email;
         this.register.phone= result[0].phone
         this.register.gender= result[0].gender
    })
  }
  edituser(mvForm){
  
      alert(JSON.stringify(this.register))
      
      this.rService.edituser(this.register).subscribe((result) => {
        alert(result.message);
        // this.rtr.navigate(['home'])
        this.rtr.navigate(['userdetails'])
      })
    }
     
  }

  


