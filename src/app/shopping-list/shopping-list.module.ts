import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../Shared/shared.module';


@NgModule(
	{
		declarations: [

			ShoppingListComponent,
			ShoppingEditComponent
		],
		imports: [RouterModule,
			SharedModule,
			FormsModule,
			ReactiveFormsModule,
			ShoppingListRoutingModule

		]


	})

export class ShoppingListModule { }
