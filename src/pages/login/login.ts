import { 
  NavController, 
  LoadingController, 
  AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { Sign_upPage } from '../sign_up/sign_up';
import { ResetPasswordPage } from '../reset-password/reset-password';
//import { EmailValidator } from '../../validators/email';
import { TabsPage } from '../tabs/tabs';
import { DataService } from '../../providers/data/data.service';
import firebase from 'firebase';
import { TextValidator } from '../../validators/text';
import { ToastController } from 'ionic-angular';


 @ Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	public loginForm;
	loading: any;
	fireAuth: any;
	userid: string;

	constructor(public _data: DataService, public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
		public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

		/**
		 * Creates a ControlGroup that declares the fields available, their values and the validators that they are going
		 * to be using.
		 *
		 * I set the password's min length to 6 characters because that's Firebase's default, feel free to change that.
		 */
		this.loginForm = formBuilder.group({
				email: ['', Validators.compose([Validators.required, TextValidator.isValid, Validators.minLength(4)])],
				password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
			});
	}

	/**
	 * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
	 * the user waits.
	 *
	 * If the form is invalid it will just log the form value, feel free to handle that as you like.
	 */
	loginUser() {
		this.fireAuth = firebase.auth();
		//  firebase.auth().signOut().then(function() {
		firebase.database().ref('/userProfile/' + this.loginForm.value.email).once('value').then(snapshot => {
			console.log('i am here login');
			if (snapshot.val() !== null) {
				console.log('i am here login2');
				//var username = snapshot.val().username;
				this.userid = snapshot.val().email;
				this._data.userid = snapshot.val().username;
				this._data.birthDate = snapshot.val().dateofbirth;
				this._data.email = snapshot.val().email;
				this._data.photoURL = snapshot.val().photoURL;

				if (this._data.photoURL == null)
					this._data.photoURL = "img_avatar3.png";

				if (!this.loginForm.valid) {
					let toast = this.toastCtrl.create({
							message: 'Invalid User ID, must be more than 5 characters',
							duration: 3200
						});
					toast.present();

					console.log(this.loginForm.value);
				} else {
					console.log('i am here login3');
					//   that.authData.loginUser(that.userid, that.loginForm.value.password).then( user => {
					this.fireAuth.signInWithEmailAndPassword(this.userid, this.loginForm.value.password).then(user => {
						firebase.database().ref('/userProfile/' + user.displayName).once('value').then(snapshot=> {
							this._data.userid = user.displayName;
							//	that._data.birthDate = snapshot.val().dateofbirth;
							//	that._data.email = snapshot.val().email;
							//	if ((snapshot.val().photoURL !== "www.photo.com") && (snapshot.val().photoURL !== null))
							//		that._data.photoURL = snapshot.val().photoURL;
							//	else
							//		that._data.photoURL = "img_avatar3.png";
						});

						this.loading.dismiss().then(() => {
							console.log("5-->" + this._data.email);
							this.nav.setRoot(TabsPage);
						});
					}, error => {
						this.loading.dismiss().then(() => {
							//	console.log(error.message);
							//		let alert = that.alertCtrl.create({
							//				message: error.message,
							//				buttons: [{

							//					text: "Ok",
							//				role: 'cancel'
							//		}
							//	]
							//	});
							//	alert.present();

							let toast = this.toastCtrl.create({
									message: error.message,
									duration: 3200
								});
							toast.present();

						});
					});

					this.loading = this.loadingCtrl.create();
					this.loading.present();
				}
			} else {

				let toast = this.toastCtrl.create({
						message: "user id not found",
						duration: 3200
					});
				toast.present();
			}
		}, function (error) {
			console.error('read Error', error);
		});
		// }, function(error) {
		//console.error('Sign Out Error', error);
		//});
	}

	goToSignup = () => this.nav.push(Sign_upPage);

	goToResetPassword = () => this.nav.push(ResetPasswordPage);

}
