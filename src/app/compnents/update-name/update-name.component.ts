import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.scss']
})
export class UpdateNameComponent implements OnInit {

  constructor(private fb:FormBuilder, private auth:AuthService, private route: Router) { 
    this.updateForm = this.fb.group({
      'Name' : ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  updateForm!:FormGroup;

  changeName($event: any){
    const data = this.updateForm.value;
    delete data['confirm']
    this.auth.changeName(data).subscribe(res=>{
      if(res.success){
        alert('Done');
        this.route.navigate(['/profile']);
        this.updateForm.reset();
      }
  },err =>{
    alert("Done");
    this.route.navigate(['/profile']);
  })
}
}
