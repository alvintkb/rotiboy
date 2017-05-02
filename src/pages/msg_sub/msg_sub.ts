import { Component, ChangeDetectorRef  } from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'page-msg_sub',
  templateUrl: 'msg_sub.html'
})
export class Msg_subPage {
subpage:string;
icon:string;
 constructor(private navParams:NavParams,private _cd:ChangeDetectorRef) {

this.subpage = navParams.get('param1');
this.icon = navParams.get('param2');
console.log("------apple-----");
console.log(this.icon);

  }
ionViewDidEnter() {
this._cd.detectChanges();
}


}
