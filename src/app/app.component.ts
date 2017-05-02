import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { DataService } from '../providers/data/data.service';
import { HomebasicPage } from '../pages/homebasic/homebasic';
import {Device} from 'ionic-native';
import firebase from 'firebase';
import { SplashScreen } from '@ionic-native/splash-screen';

declare var MobileAccessibility: any;

 @ Component({
	template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
	rootPage: any;
	zone: NgZone;
	msgcount: number;
	constructor(private platform: Platform, private _data: DataService,public _SplashScreen: SplashScreen) {
    this.initializeApp();
		this.zone = new NgZone({});
		firebase.initializeApp({
			apiKey: "AIzaSyB15k9zkAp8zYVPSbXJcOhQvPhkLle74wA",
			authDomain: "helloworld-feb2b.firebaseapp.com",
			databaseURL: "https://helloworld-feb2b.firebaseio.com",
			storageBucket: "helloworld-feb2b.appspot.com",
			//   messagingSenderId: "429759287492"

		});

	platform.ready().then(() => {
			if (Device.uuid != "6F196F23-FD0D-4F62-B27B-730147FCC5A3") 
			 if (Device.uuid != "DC46B660-EF6F-46D4-AC24-85CFAB0C7694")
              if (Device.uuid != "903802EA-1786-4175-B0F1-1FDF87813CAA")
		MobileAccessibility.usePreferredTextZoom(false);
		})

	
			_data.init();
	var connectedRef = firebase.database().ref(".info/connected");
			connectedRef.on("value", snap => {
				if (snap.val() === true) {
					console.log('>>>>>>>>>>>>>isonline');
					_data.isonline = true;
					console.log(this._data.uid);
					if (this._data.uid == undefined)
					this.rootPage = LoginPage;
					else
					this.rootPage = TabsPage;
				} else {
					_data.isonline = false;
				}
			});
		console.log('---------auth leh----------------');
		this.rootPage = HomebasicPage;
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
				this.zone.run(() => {
					if (!user) {
						this.rootPage = LoginPage;
						unsubscribe();
					} else {
						console.log('---------start-----------------');
					//	this.rootPage = TabsPage;  
						this._data.uid = user.displayName;
						console.log("---->A1" + user.displayName);
				
						///  firebase.database().ref('/userProfile/' + user.uid).once('value').then(function(snapshot) {
						firebase.database().ref('/userProfile/' + user.displayName).once('value').then( (snapshot)=>{
							this._data.userid = user.displayName;
							this._data.birthDate = snapshot.val().dateofbirth;
							this._data.email = snapshot.val().email;
							if ((snapshot.val().photoURL !== "www.photo.com") && (snapshot.val().photoURL !== null))
								this._data.photoURL = snapshot.val().photoURL;
							else
								this._data.photoURL = "img_avatar3.png";
							//  this._data.username = snapshot.val().username;

						});

						unsubscribe();
					}
				});
			});

	
	}

	initializeApp() {
    this.platform.ready().then(() => {
      // do whatever you need to do here.
      setTimeout(() => {
        this._SplashScreen.hide();
      }, 50);
    });
  }

}
