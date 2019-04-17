import { Component, OnInit } from '@angular/core';

import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/registermodel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  rObj: RegisterModel;
  constructor(private rService: RegisterService,private rtr:Router) { 
    this.rObj = new RegisterModel();
  }
  adduser(mvForm) {
    if (mvForm.valid) {
      alert(JSON.stringify(this.rObj))
      
      this.rService.adduser(this.rObj).subscribe((result) => {
        alert(result.message);
        // this.rtr.navigate(['home'])
        this.rtr.navigate(['userdetails'])
      })
    }
    else {
      alert("Invalid Data ..")
    }
  }
  ngOnInit() {
  }

}
