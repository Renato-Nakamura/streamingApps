import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
export interface Item {
  logo: string;
  name: string;
  price: number;
  sharedWith: number;
}
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {
  payingValue = 0;
  user = {
    id: '',
    name: '',
    email: '',
    photo: '',
  };
  items: any[];
  private itemsCollection: AngularFirestoreCollection<Item>;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    //if(!environment.user.id){
    //this.router.navigate(['/'])
    //}
    //let user = await this.authService.loggedIn()
    let a =this.auth.loggedIn()
    console.log('aaa',a)
    let userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
      this.itemsCollection = this.afs.collection<Item>(this.user.id);
      this.itemsCollection.valueChanges().subscribe((i) => {
        this.items = i;
        this.payingValue = i
          .map((a) => a.price / a.sharedWith)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );
      });
    } else {
      this.router.navigate(['/login']);
    }
    //this.app()
  }

  totalPrice() {
    for (let i of this.items) {
      this.payingValue = this.payingValue + i.price;
    }
  }

  sair() {
    this.auth.userLogout();
  }
  //  app() {

  //}
}
