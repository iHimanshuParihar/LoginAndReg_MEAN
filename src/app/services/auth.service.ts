import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface updateStatus {
  success: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http:HttpClient) { }

  signUp(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/auth/signup',data);
  }
  login(data:any):Observable<any>{ 
    return this.http.post('http://localhost:8080/auth/login',data);
  }
  getProfile():Observable<any>{
    let headers = {
      'Authorization' : "Bearer " + localStorage.getItem('token')
    }
    return this.http.get('http://localhost:8080/auth/profile',{headers:headers});

  }
  changeName(data:any):Observable<any>{
    return this.http.post<updateStatus>('/api/quote', {
      data
    })
  }

  }

