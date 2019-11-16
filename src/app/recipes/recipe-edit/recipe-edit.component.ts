import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipeform: FormGroup;
  editMode = false;
  constructor(private route: ActivatedRoute, private recipeservice: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {

        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipename = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeservice.getRecipe(this.id);
      recipename = recipe.name;
      recipeImagePath = recipe.ImagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }
          ));
        }
      }
    }

    this.recipeform = new FormGroup({
      'name': new FormControl(recipename, Validators.required),
      'imagepath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
  onAddIngredient() {
    (<FormArray>this.recipeform.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onSubmit() {
    const newrecipe = new Recipe(this.recipeform.value['name'],
      this.recipeform.value['description'],
      this.recipeform.value['imagepath'],
      this.recipeform.value['ingredients']
    )
    if (this.editMode) {
      this.recipeservice.updateRecipe(this.id,newrecipe);
    }
    else {
      this.recipeservice.addRecipe(newrecipe);
    }
    this.onCancel();
  }

  onDeleteIngredient(index: number) {
   ( <FormArray>this.recipeform.get('ingredients')).removeAt(index);
  }
}
