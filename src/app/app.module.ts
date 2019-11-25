import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppinglistService } from './shopping-list/shoppinglist.service';
import { RouterModule } from '@angular/router';
import { appRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import {AuthComponent} from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './Shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './Shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
   
		AuthComponent,
	
  ],
  imports: [
	  BrowserModule,
	  FormsModule,
	  ReactiveFormsModule,
	  HttpClientModule,
	  appRoutingModule,
	  RecipesModule,
	  ShoppingListModule,
	  SharedModule
	],
	providers: [ShoppinglistService, RecipeService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true,

		}],
	bootstrap: [AppComponent]
})
export class AppModule { }
