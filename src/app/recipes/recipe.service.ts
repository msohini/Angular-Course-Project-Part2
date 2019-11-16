import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Shared/Ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

  recipeschanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Butter Chicken',
      'Exquisite Dish',
      'https://www.seriouseats.com/2019/07/20190619-korean-bbq-vicky-wasik-29.jpg',
      [new Ingredient('Chicken', 1), new Ingredient('Butter', 1)]
    ),
    new Recipe('Fried Rice',
      'Aroma Rice',
      'https://www.seriouseats.com/2019/07/20190619-korean-bbq-vicky-wasik-29.jpg',
      [new Ingredient('Rice', 1), new Ingredient('oil', 1)]
    )
  ];
  constructor(private slservice: ShoppinglistService) {

  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index : number) {
    return this.recipes[index];
  }
  //recipeSelected = new EventEmitter<Recipe>();

  //recipeSelected = new Subject<Recipe>();
  addIngredientstoShoppingList(ingredients:Ingredient[]) {
    this.slservice.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeschanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeschanged.next(this.recipes.slice());

  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeschanged.next(this.recipes.slice());
  }
}
