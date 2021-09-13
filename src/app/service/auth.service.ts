import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    private router: Router
  ) { }

  loggedIn(){
    this.auth.onAuthStateChanged(user =>{
      if(user){
        const {displayName,email,photoURL,uid} = user
        if(!displayName || !email || !photoURL)
        throw new Error('Missing information on your Google account')
        environment.user.id =uid
        environment.user.email = email
        environment.user.name = displayName
        environment.user.photo = photoURL
      }
      else{
        this.router.navigate(['/login'])
      }
    })
  }
}
