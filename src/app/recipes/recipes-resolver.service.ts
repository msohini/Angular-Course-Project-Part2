import {Injectable} from '@angular/core'
import {Resolve} from '@angular/router'
import {Recipe} from './recipe.model'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from './recipe.service';

@Injectable ({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
constructor(private dataStorageService: DataStorageService, private RecipeService : RecipeService){}
resolve(route :ActivatedRouteSnapshot, state : RouterStateSnapshot ){
const recipes= this.RecipeService.getRecipes();
if(recipes.length===0){
return this.dataStorageService.fetchRecipes();
}
else{
  return recipes;
}

}

}
