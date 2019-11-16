import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  //recipes: Recipe[] = [new Recipe('A Test Recipe', 'This is simply a test', 'https://www.seriouseats.com/2019/07/20190619-korean-bbq-vicky-wasik-29.jpg'),
  //  new Recipe('A Test Recipe', 'Another Recipe', 'https://www.seriouseats.com/2019/07/20190619-korean-bbq-vicky-wasik-29.jpg')
  //  ];

  subscription: Subscription;
  recipes: Recipe[] = [];
  constructor(private RecipeService: RecipeService, private router : Router,private route: ActivatedRoute) { }
  @Output() RecipeWasSelected = new EventEmitter<Recipe>();
  ngOnInit() {
    this.subscription=this.RecipeService.recipeschanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.RecipeService.getRecipes();
   
  }
  //onRecipeSelected(recipe: Recipe) {
  //  this.RecipeWasSelected.emit(recipe);
  //}
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
