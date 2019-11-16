import { Ingredient } from '../Shared/Ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public ImagePath: string;
  public ingredients: Ingredient[];
  constructor(name: string, desc: string, img: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.ImagePath = img;
    this.ingredients = ingredients;
  }
}
