//import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //MenuSelected: string;
  //@Output() MenuSelected = new EventEmitter<string>();

  
constructor(private dataStorageService : DataStorageService){}
  onSaveData(){
  this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnInit() {
  }
  //@Output() featureSelected = new EventEmitter<string>();
  //OnSelect(feature: string) {
  //  this.featureSelected.emit(feature);
  //}
}
