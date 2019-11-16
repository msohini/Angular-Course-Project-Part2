import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from '../../Shared/Ingredient.model';
import { ShoppinglistService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f', { static: false }) slForm: NgForm;
  //@ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  //@ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @Output() IngredientAdded = new EventEmitter<Ingredient>();
  constructor(private shoppinglistservice: ShoppinglistService) { }
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  ngOnInit() {
    this.subscription = this.shoppinglistservice.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistservice.getIngredients(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    //const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    //this.IngredientAdded.emit(newIngredient);
    if (this.editMode) {
      this.shoppinglistservice.updateIngredient(this.editedItemIndex, newIngredient );
    }
    else {
      this.shoppinglistservice.AddIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
  
    this.shoppinglistservice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
