import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-streaming',
  templateUrl: './add-streaming.component.html',
  styleUrls: ['./add-streaming.component.scss']
})
export class AddStreamingComponent implements OnInit {
  myControl = new FormControl();
  streaming = [{
    logo: "https://i.imgur.com/wCyMYAE.png",
    name:"Disney+",
    price:22.50
  },
  {
    logo: "https://i.imgur.com/wCyMYAE.png",
    name:"Paramount+",
    price:10.50
  }]
  options: string[] = this.streaming.map(i=>i.name);
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}


