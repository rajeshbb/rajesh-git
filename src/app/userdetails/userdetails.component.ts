import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register2Service } from '../services/register2.service';
  
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {


users:any[]=[]
  
  
  constructor(private rService: Register2Service, private rtr: Router) { }
  
 
  btnDetails(username: string) {
    this.rtr.navigate(['details/'+username ])
  }

  btnDelete(username: string) {
    this.rService.deletebyuser(username).subscribe((result) => {
      alert(result.message)
      if (result.message) {
        let dIndex = this.users.findIndex(x => x. username== username)
        this.users.splice(dIndex, 1)
      }
    })
  }

  btedit(username){
    this.rtr.navigate(['edit/'+username ])
  }

  ngOnInit() {
    this.rService.getallusers().subscribe((data) => {
      this.users = data;
      console.log(JSON.stringify(this.users))
    })
  }

}
