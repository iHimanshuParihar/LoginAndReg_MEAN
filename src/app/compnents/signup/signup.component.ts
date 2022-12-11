import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpform! : FormGroup;
  alertMessage:string = '';
  Flag:boolean=false;
  constructor(private fb:FormBuilder, private auth:AuthService, private route: Router) {
    this.signUpform = this.fb.group({
      'Name' : ['', Validators.required],
      'Email' : ['', Validators.required],
      'Password' : ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  signUp(){
    const data = this.signUpform.value;
    delete data['confirm']
    this.auth.signUp(data).subscribe(res=>{
      if(res.success){
      alert('User Registered Succesfully!');
      this.route.navigate(['/login']);
      this.signUpform.reset();
      }else{
        alert('User Already Exist!')
      }
    },err =>{
      alert("Server Error");
    })
  }
}
