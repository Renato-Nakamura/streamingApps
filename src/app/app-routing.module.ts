import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStreamingComponent } from './add-streaming/add-streaming.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path: "login", component:LoginScreenComponent},
  {path: "home", component:HomeScreenComponent},
  {path: "addStreaming", component: AddStreamingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
