import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
  template: `
    <div *ngIf="auth.user | async as user; else showLogin">
      <h1>Hello {{ user.displayName }}!</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <ng-template #showLogin>
      <p>Please login.</p>
      <button (click)="login()">Login with Google</button>
    </ng-template>
  `,
})
export class LoginScreenComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit()  {
    console.log(environment.user.id)
    this.authService.loggedIn()
    //this.router.navigate(["/home"])
  }
  

  async login() {
    let result =  await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(["/home"])
    if(result.user?.displayName && result.user.getIdToken && result.user.email && result.user?.photoURL){
      this.authService.userLogged = {
        id : result.user.uid,
        email:result.user.email,
        name:result.user?.displayName,
        photo:result.user?.photoURL
      }
      localStorage.setItem('user',JSON.stringify(this.authService.userLogged))
    }
  }
}
