import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


export interface UserLogged {
  id:string,
  email: string,
  name:string,
  photo: string,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public auth: AngularFireAuth,
    private router: Router,

  ) { }
   userLogged:UserLogged
  async loggedIn(){
 
    this.auth.onAuthStateChanged(user =>{
      if(user){
        const {displayName,email,photoURL,uid} = user
        if(!displayName || !email || !photoURL)
        throw new Error('Missing information on your Google account')
        environment.user.id =uid
        environment.user.email = email
        environment.user.name = displayName
        environment.user.photo = photoURL
        this.userLogged = {
          id : uid,
          email:email,
          name:displayName,
          photo:photoURL
        }
      }
      else{
        this.router.navigate(['/login'])
      }
    })
    return this.userLogged
  }
}
