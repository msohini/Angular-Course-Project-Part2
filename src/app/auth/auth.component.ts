import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../Shared/alert/alert.component';
import { PlaceholderDirective } from '../Shared/placeholder/placeholder.directive';


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html'

})
export class AuthComponent {

	isLoginMode = true;
	isLoading = false;
	error: string = null;
	@ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
	private closeSub: Subscription;
	constructor(private authservice: AuthService, private router : Router,private componentFactoryResolver : ComponentFactoryResolver) {
	}

	SwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}
	handlerError() {
		this.error = null;
	}
	private showErrorAlert(message: string) {
		debugger;
		const alertCompFactory= this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();
		const alertCompRef = hostViewContainerRef.createComponent(alertCompFactory);
		alertCompRef.instance.message = message;
		this.closeSub = alertCompRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear();

		});
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}
		const email = form.value.email;
		const password = form.value.password;
		this.isLoading = true;
		let authObs: Observable<AuthResponseData>;
		if (this.isLoginMode) {
			authObs = this.authservice.login(email, password);
		}
		else {
			authObs = this.authservice.signup(email, password);
		}
		authObs.subscribe(resData => {
			console.log(resData);
			this.isLoading = false;
			this.router.navigate(['./recipes']);
		},
			errorMessage => {
				console.log(errorMessage);
				this.error = errorMessage;
				this.showErrorAlert(errorMessage);
				this.isLoading = false;
			});

		form.reset();
	}
}
