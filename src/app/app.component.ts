import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
loginstatus: Observable<any>
constructor(private router:Router){}

lnkLogout_Click(){
  localStorage.removeItem("username");
  this.router.navigate(['home']);
}
checkLocalStorage(): Observable<any> {
  return of (localStorage.getItem("username"))
}
ngDoCheck() {
  this.checkLocalStorage().subscribe((data) => { this.loginstatus = data });
}
ngOnInit() {

}


}
