


import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;

}
@Injectable({ providedIn: 'root' })

export class AuthService {
	//user = new Subject<User>();
	user = new BehaviorSubject<User>(null);
	constructor(private http: HttpClient) { }
	signup(email : string, password: string) {

		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoIqGCGxgEH3FbY3z2oaJNrUQlmiUDCEI',
			{
				email: email,
				password: password,
				returnSecureToken: true
			}
		).pipe(catchError(this.handleError), tap(resData => {
			this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
		}));

	}


	login(email: string, password: string) {


		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoIqGCGxgEH3FbY3z2oaJNrUQlmiUDCEI',
			{
				email: email,
				password: password,
				returnSecureToken: true
			}
		).pipe(catchError(this.handleError), tap(resData => {
			this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
		}));
	}


	private handleError(ErrorRes: HttpErrorResponse) {
		let errorMessage = 'An unknown error occured!';
		if (!ErrorRes.error || !ErrorRes.error.error) {
			return throwError(errorMessage);
		}

		switch (ErrorRes.error.error.message) {
			case 'EMAIL_EXISTS': errorMessage = 'Email Already exists!!';
				break;
			case 'EMAIL_NOT_FOUND': errorMessage = 'Email does not exist!!';
				break;
			case 'INVALID_PASSWORD': errorMessage = 'Wrong Password!!';
				break;
			case 'USER_DISABLED': errorMessage = 'User Disabled!!';
				break;
		}

		return throwError(errorMessage);

	}

	private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
		const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);
		const user = new User(email, id, token, expirationDate);
		this.user.next(user);
	}
}



