import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  forgetForm!:FormGroup

  sendMail(){
    alert('password reset link sent on mail')
  }
}
