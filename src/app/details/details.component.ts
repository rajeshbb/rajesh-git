import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/registermodel';
import { Register2Service } from '../services/register2.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
register:RegisterModel 
  constructor(private acr:ActivatedRoute, private rService:Register2Service) { 
    this.register=new RegisterModel
  }

  ngOnInit() {

     let i: number = this.acr.snapshot.params.username
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
  }


