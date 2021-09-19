import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';
import { DatabaseService } from '../service/database.service';


@Component({
  selector: 'app-add-streaming',
  templateUrl: './add-streaming.component.html',
  styleUrls: ['./add-streaming.component.scss']
})
export class AddStreamingComponent implements OnInit {

  constructor(
    private db:DatabaseService,
    private auth:AuthService,
    ) { 

    }
  myControl = new FormControl();
  chosenStreaming = {
    logo: "https://imgur.com/sZJWdbK.png",
    name:"",
    price: 0,
    sharedWith: 1
  }
  streaming = [{
    logo: "https://i.imgur.com/wCyMYAE.png",
    name:"Disney+",
    price:22.50,
    sharedWith: 0
  },
  {
    logo: "https://imgur.com/5IckLFE.png",
    name:"Paramount+",
    price:10.50,
    sharedWith: 0
  }]
  options: string[] = this.streaming.map(i=>i.name);
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.auth.loggedIn()
  }

  //pega o valor do campo value e faz um filter com as options
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectedStreaming(){
    let indexChosenStreaming = this.options.indexOf(this.myControl.value)
    this.chosenStreaming = this.streaming[indexChosenStreaming]
    console.log(this.chosenStreaming)
  }
  addStreaming(){
    console.log("show")
    this.db.addStreaming(this.chosenStreaming,environment.user.id)
  }

}


