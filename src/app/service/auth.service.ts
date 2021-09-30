import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';


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
  async login() {
    let userJSON = localStorage.getItem('user');
    if(userJSON){
      this.router.navigate(["/home"])
    }
    else{
    let result =  await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(["/home"])
    if(result.user?.displayName && result.user.getIdToken && result.user.email && result.user?.photoURL){
      this.userLogged = {
        id : result.user.uid,
        email:result.user.email,
        name:result.user?.displayName,
        photo:result.user?.photoURL
      }
      localStorage.setItem('user',JSON.stringify(this.userLogged))
    }
  }
  }

  userLogout(){
    localStorage.clear()
    this.auth.signOut().then(()=>{
      this.router.navigate(['/'])
    })
  }
   userLogged:UserLogged
  async loggedIn(){
    this.auth.onAuthStateChanged(user =>{
      if(user){
        const {displayName,email,photoURL,uid} = user
        if(!displayName || !email || !photoURL){
          localStorage.clear()
          throw new Error('Missing information on your Google account')
        }
        this.userLogged = {
          id : uid,
          email:email,
          name:displayName,
          photo:photoURL
        }
        localStorage.setItem('user',JSON.stringify(this.userLogged))
      }
      else{
        this.router.navigate(['/login'])
      }
    })
  }
}
