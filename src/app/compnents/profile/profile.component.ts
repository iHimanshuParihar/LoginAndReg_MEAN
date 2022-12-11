import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data!:any;
  constructor(private auth:AuthService,private route:Router) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.auth.getProfile().subscribe((res)=>{
      if(res.success){
        this.data = res.data;
      }
    })
  }

  logout(){
    localStorage.clear();
    this.route.navigate(['/login'])
  
  }
  changeName(){
    this.route.navigate(['/name'])
  }
}
