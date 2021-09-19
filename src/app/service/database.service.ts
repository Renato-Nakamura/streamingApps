import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

export interface Item {
  logo: string,
  name:string,
  price: number,
  sharedWith: number
}
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(
    private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('teste');
    this.items = this.itemsCollection.valueChanges();

  }
  addStreaming(streaming:Item,id:string) {
    let teste = this.afs.collection<Item>(id).add(streaming)
    return teste
  }
}
