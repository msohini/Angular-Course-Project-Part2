import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { AuthComponent } from './auth/auth.component';


const approutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
 
	{ path: 'auth', component: AuthComponent }

];
@NgModule({
  imports: [
    RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class appRoutingModule {

}
