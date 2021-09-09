import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  payingValue = 0
  user = environment.user
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
  //total = this.streaming.length != parseInt(this.streaming.findIndex)
 
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(){
    this.authService.loggedIn()
    this.totalPrice()
    console.log( this.user)
  }

  totalPrice(){
    for(let i of this.streaming){
      this.payingValue = this.payingValue + i.price
    }
  }
}
