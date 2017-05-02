import { Component, ChangeDetectorRef  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { TransactionPage } from '../transaction/transaction';
import { MessagePage } from '../message/message';
import { DataService } from '../../providers/data/data.service';
import {Deploy} from "@ionic/cloud-angular";
import {AlertController,LoadingController, ToastController} from "ionic-angular";
import { Platform } from 'ionic-angular';
import {Device} from 'ionic-native';

 @ Component({
	selector: 'page-Home',
	templateUrl: 'Home.html'
})
export class HomePage {
	color: string;
	color2: string;
	msgcount: number;
	cameraData: string;

	constructor(private alertCtrl: AlertController, private platform: Platform, private readonly deploy: Deploy, private readonly loadingCtrl: LoadingController,
		private readonly toastCtrl: ToastController, public _cd: ChangeDetectorRef, public _data: DataService, public nav: NavController,
		private popoverCtrl: PopoverController) {
		this.color2 = "#603814";
		this.color = "D5B114";

		if (Device.uuid != "6F196F23-FD0D-4F62-B27B-730147FCC5A3")
			if (Device.uuid != "DC46B660-EF6F-46D4-AC24-85CFAB0C7694")
				if (Device.uuid != "903802EA-1786-4175-B0F1-1FDF87813CAA") {
					this.checkForUpdate();
				}
	}

	//   var model = device.model;
	//   var deviceID = device.uuid;
	//   var string = device.version;

	checkForUpdate2 = () => {
		let prompt = this.alertCtrl.create({
				title: 'We are pleased to announce a software update is available (V.11) which improves the usability of this App',
				message: "Press OK to update, cancel to skip.",
				buttons: [{
						text: 'OK',
						handler: () => {
							this.downloadAndInstall();
							// this.downloadAndInstall();ionic
						}
					}, {
						text: 'Cancel',
						handler: () => {
							//  alert('fffooo');
							// this.downloadAndInstall();
						}
					}
				]

			});
		prompt.present();
	}

	checkForUpdate = () => {
		const checking = this.loadingCtrl.create({
				content: 'Checking for update...'
			});
		checking.present();

		this.deploy.check().then((snapshotAvailable: boolean) => {
			checking.dismiss();
			if (snapshotAvailable) {
				this.checkForUpdate2();
			} else {
				//   checking.dismiss();
				const toast = this.toastCtrl.create({
						message: 'Welcome to ROTIBOY',
						position: 'top',
						duration: 3000
					});
				toast.present();
			}
		});
	}

	private downloadAndInstall = () => {
		const updating = this.loadingCtrl.create({
				content: 'Updating application...'
			});
		updating.present();
		this.deploy.download().then(() => this.deploy.extract()).then(() => this.deploy.load());
	}

	onPageDidEnter() {
		console.log("Dashboard page load event fired.");
	}
	ionViewDidEnter() {
		if (this._data.photoURL == null)
			this._data.photoURL = "img_avatar3.png";
		console.log('**did enter**');

	}
	ionViewWillEnter() {
		if (this._data.photoURL == null)
			this._data.photoURL = "img_avatar3.png";
  		this._data.getMsgSyn_store('message').subscribe(cc => {
			this.msgcount = this._data.msgcount;
			if (this._data.photoURL == null)
				this._data.photoURL = "img_avatar3.png";
			this._cd.detectChanges();
		});

	}

	gototranhis = () => this.nav.push(TransactionPage);

	goto_message = () => this.nav.push(MessagePage);

	clickListener = card => {
		card.addEventListener("click", function () {
			var c = this.classList;
			c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
		});
	};

	ionViewDidLoad() {
		var cards = document.querySelectorAll(".card.effect__click");
		for (let i = 0, len = cards.length; i < len; i++) {
			var card = cards[i];
			this.clickListener(card);
		}

	}
}
