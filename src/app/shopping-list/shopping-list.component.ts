import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../Shared/Ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  //providers: [ShoppinglistService]
})
export class ShoppingListComponent implements OnInit,OnDestroy {
   
  //ingredients: Ingredient[] = [new Ingredient('Apples', 10),
  //  new Ingredient('Tomatoes', 10)
  //];
  ingredients: Ingredient[] = [];
  constructor(private shoppinglistservice:ShoppinglistService) { }
  private igSaveSub: Subscription;
  ngOnInit() {
    this.ingredients = this.shoppinglistservice.getIngredient();
    this.igSaveSub= this.shoppinglistservice.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    );
  }

  //onIngredientAdded(ingredient: Ingredient) {
  //  this.ingredients.push(ingredient);
  //  //this.shoppinglistservice.AddIngredient(ingredient);
  //}

  ngOnDestroy(): void {
    this.igSaveSub.unsubscribe();
}
  onEditItem(index: number) {
    this.shoppinglistservice.startedEditing.next(index);
  }
}
