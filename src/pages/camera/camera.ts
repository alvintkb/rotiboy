import { Component, ChangeDetectorRef  } from '@angular/core';
import {Camera} from 'ionic-native';
import {NavController, Platform, AlertController} from 'ionic-angular';
import {Transfer} from 'ionic-native';
import firebase from 'firebase';
import { DataService } from '../../providers/data/data.service';
import { ProfileData } from '../../providers/profile-data';

declare var window : any;
 @ Component({
	selector : 'page-camera',
	templateUrl : 'camera.html'
})
export class CameraPage {
	photoTaken : boolean;
	cameraUrl : string;
	photoSelected : boolean;
	storageDirectory : string = '';
	user : any;

	constructor(public profileData: ProfileData,public _cd : ChangeDetectorRef, public _data : DataService, private navCtrl : NavController, public platform : Platform, public alertCtrl : AlertController) {
		this.photoTaken = true;
		this.platform.ready().then(() => {
			// make sure this is on a device, not an emulation (e.g. chrome tools device mode)
			if (!this.platform.is('cordova')) {
				return false;
			}

			if (this.platform.is('ios')) {
				this.storageDirectory = window.file.documentsDirectory;
			} else if (this.platform.is('android')) {
				this.storageDirectory = window.file.dataDirectory;
			} else {
				// exit otherwise, but you could add further types here e.g. Windows
				return false;
			}
		});

		this.user = firebase.auth().currentUser;
	}

	selectFromGallery() {
		var options = {
			sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
			destinationType : Camera.DestinationType.DATA_URL,
			targetWidth : 300,
			targetHeight : 300,
			allowEdit : true,
			saveToPhotoAlbum : true
		};
		Camera.getPicture(options).then((imageData) => {
			//     this._data.photoURL = imageData;
			this._data.photoURL = 'data:image/jpeg;base64,' + imageData;
			this._cd.detectChanges();
			if (this.user) {
				this.user.updateProfile({
			//		displayName : this.user.displayName,
					photoURL : this._data.photoURL
				});
			}

		}, (err) => {
			// Handle error
		});
	}

	openCamera() {
		//   this.downloadImage("pug.jpg");
		var options = {
			sourceType : Camera.PictureSourceType.CAMERA,
			destinationType : Camera.DestinationType.DATA_URL,
			quality : 95,
			//ios : Camera.DestinationType.NATIVE_URI
			allowEdit : true,
			targetWidth : 300,
			targetHeight : 300,
			saveToPhotoAlbum : true
		};
		Camera.getPicture(options).then((imageData) => {
			this._data.photoURL = 'data:image/jpeg;base64,' + imageData;
			this.photoTaken = true;
			this.photoSelected = false;

		//	if (this.user) {
        this.profileData.updatephotoURL(this._data.photoURL);
		//		this.user.updateProfile({
			//		displayName : this.user.displayName,
			//		photoURL : this._data.photoURL
			//	});
		//	}
		}, (err) => {
			// Handle error
		});
	}

	downloadImage(image) {
		this.platform.ready().then(() => {
			const fileTransfer = new Transfer();
			const imageLocation = `${window.file.applicationDirectory}www/assets/img/${image}`;
			fileTransfer.download(imageLocation, this.storageDirectory + image).then((entry) => {
				const alertSuccess = this.alertCtrl.create({
						title : `Download Succeeded!`,
						subTitle : `${image} was successfully downloaded to: ${entry.toURL()}`,
						buttons : ['Ok']
					});

				alertSuccess.present();

			}, (error) => {

				const alertFailure = this.alertCtrl.create({
						title : `Download Failed!`,
						subTitle : `${image} was not successfully downloaded. Error code: ${error.code}`,
						buttons : ['Ok']
					});
				alertFailure.present();
			});

		});

	}
}
