import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  payingValue = 0
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

  constructor() { }

  ngOnInit(){
    this.priceTotal()
  }

  priceTotal(){
    for(let i of this.streaming){
      this.payingValue = this.payingValue + i.price
    }
  }
}
