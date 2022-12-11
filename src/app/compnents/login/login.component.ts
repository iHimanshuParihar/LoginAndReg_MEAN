import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder, private auth : AuthService,private route:Router) {
    this.loginForm = this.fb.group({
      'Email' : ['', Validators.required],
      'Password' : ['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  login(){
    const data = this.loginForm.value;
    this.auth.login(data).subscribe((res)=>{
      if(res.success){
        alert("Login Success!!");
        localStorage.setItem('token',res.token);
        this.route.navigate(['/profile']);
      }else{
        alert('Incorrect Email/Password! or User Not Registered!')
      }
    },err=>{
      alert('Login Failed')
    })
  }
  

}
