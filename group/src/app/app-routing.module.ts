import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [{
  path:"cart",
  component:CartComponent
},
{
  path:"userinfo",
  component:UserInfoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
