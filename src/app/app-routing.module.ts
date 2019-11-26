import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';



const approutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
 // Added  for Lazy loading

	{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },

	{ path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },

	{ path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
];
@NgModule({
  imports: [
		RouterModule.forRoot(approutes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class appRoutingModule {

}
