import { Component, OnInit } from '@angular/core';
import { AuthicationService } from '../services/authication.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSer : AuthicationService,private router:Router) { }


  login_Click(username, password){
    let u  = username.value;
    let p = password.value;
    this.authSer.AuthicateUser(u,p).subscribe((result)=>{
      if(result.valid=="true"){
        localStorage.setItem("username",u)
        alert("Login Success....")
      this.router.navigate(['/home'])
      }
      else alert('invalid login')
      

      
    })
  }
  ngOnInit() {
  }

}
