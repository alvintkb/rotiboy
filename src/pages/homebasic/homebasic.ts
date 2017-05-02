import { Component, ChangeDetectorRef  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { TransactionPage } from '../transaction/transaction';
import { MessagePage } from '../message/message';
import { DataService } from '../../providers/data/data.service';
import {Deploy} from "@ionic/cloud-angular";
import {LoadingController, ToastController} from "ionic-angular";
import { CollapseDirective } from 'ng2-bootstrap'


 @ Component({
	selector: 'page-Homebasic',

	templateUrl: 'Homebasic.html'
})
export class HomebasicPage {
	color: string;
	color2: string;
	msgcount: number;
	cameraData: string;

	constructor(private readonly deploy: Deploy, private readonly loadingCtrl: LoadingController,
		private readonly toastCtrl: ToastController, public _cd: ChangeDetectorRef, public _data: DataService, public nav: NavController, private popoverCtrl: PopoverController) {

		this.color2 = "#603814";
		this.color = "D5B114";
		//  this._data.getMsgSyn_store('message').subscribe(cc=>{
		//  this.msgcount = this._data.msgcount;
		//    if  (_data.photoURL == null)
		//	_data.photoURL = "img_avatar3.png";
		//  this._cd.detectChanges();
		//  });
	}

	gogo = () => this.nav.push(TransactionPage);
	
	private downloadAndInstall() {
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

	ionViewWillEnter = () => {
		if (this._data.photoURL == null)
			this._data.photoURL = "img_avatar3.png";
		console.log('**ionViewWillEnter**');
	}

	gototranhis = () => this.nav.push(TransactionPage);

	clickListener = card => {
		card.addEventListener("click", function () {
			var c = this.classList;
			c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
		});
	}

	ionViewDidLoad() {
		let cards = document.querySelectorAll(".card.effect__click");
		for (let i = 0, len = cards.length; i < len; i++) {
			var card = cards[i];
			this.clickListener(card);
		}

	}
}
