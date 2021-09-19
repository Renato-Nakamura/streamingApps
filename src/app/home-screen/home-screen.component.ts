import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';
import { DatabaseService } from '../service/database.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
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
  items: Observable<any[]>;
  items2: any[];
  private itemsCollection: AngularFirestoreCollection<Item>;
  constructor(
    private authService: AuthService,
    private dbs: DatabaseService,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private router: Router
  ) {
    
  }

   async ngOnInit() {
    //if(!environment.user.id){
      //this.router.navigate(['/'])
    //}
    //let user = await this.authService.loggedIn()
    let userJSON = localStorage.getItem('user')
    if(userJSON){
      this.user = JSON.parse(userJSON)
      
      this.itemsCollection = this.afs.collection<Item>(this.user.id);
      this.itemsCollection.valueChanges().subscribe(i =>{
        this.items2 = i
        this.payingValue =i.map(a=>a.price).reduce((previousValue,currentValue)=>previousValue+currentValue)
      });
    }else{
      this.router.navigate(['/login'])
    }
    //this.app()
    
  }

  totalPrice() {
    for (let i of this.items2) {
      this.payingValue = this.payingValue + i.price;
    }
  }
  app() {
    
    for (let i of this.items2) {
      this.payingValue = this.payingValue + i.price;
      console.log(i.price);
    }
  }
}
