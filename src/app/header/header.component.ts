//import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //MenuSelected: string;
	//@Output() MenuSelected = new EventEmitter<string>();
	private userSub: Subscription;
	isAuthenticated = false;
	constructor(private dataStorageService: DataStorageService, private authservice: AuthService) { }
  onSaveData(){
  this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
	ngOnInit() {

		this.userSub = this.authservice.user.subscribe(user => {
			this.isAuthenticated = !user ? false : true;
		}

		);

	}

	onLogout() {

		this.authservice.logout();
	}
	ngOnDestroy() {

		this.userSub.unsubscribe();
	}

  //@Output() featureSelected = new EventEmitter<string>();
  //OnSelect(feature: string) {
  //  this.featureSelected.emit(feature);
  //}
}
