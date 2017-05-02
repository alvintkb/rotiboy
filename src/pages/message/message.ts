import { Component, ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { Msg_subPage } from '../msg_sub/msg_sub';

import { Storage } from '@ionic/storage';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
 public message: string;
  public direct: string; 
 //   public trans: FirebaseListObservable<any>;
 public trans = [];
 //   public msgcount:any;
    status:string = "";

  constructor(private af:AngularFire,private storage: Storage,private nav:NavController,private _cd:ChangeDetectorRef,private _data:DataService,public navCtrl: NavController, public navParams: NavParams) {
//console.log(userData.getUsername().then((username) => {console.log(username + "<<<<<")}));
//console.log(_data.getRecCount().then((username) => {console.log(username + "<****")}));
//console.log(_data.getRecCount()+"<:::");
//if (this._data.isonline)
//{
//this.trans = this.af.database.list('/message', {
 //     query: {
  //      orderByChild: 'date'
  //    }
  //  })
  //  console.log('i am alive');

  //  console.log(this.trans);
//}
//else
//{
 
         console.log('night fever');
//}
  }

ionViewWillEnter(){

}

ionViewWillLeave(){
console.log("k-ionViewWillLeave");
}
ionViewDidLeave(){
console.log("k-ionViewDidLeave");
}
ionViewWillUnload(){
console.log("k-ionViewWillUnload");
} 
ionViewDidUnload(){
console.log("k-ionViewDidUnload");
}

ionViewDidEnter() {
  this.storage.get('message').then((val) => {
  this.trans =val;
  console.log('$$$$');
  console.log(this.trans);
    this._cd.detectChanges();
       });

this._cd.detectChanges();

}

gotonews_sub(icon:string,page:string,id:string)
{
this._data.updateDataObs_isread_true('message',id);
var index = this._data.tabs.map(function(d) { return d['title']; }).indexOf('Message');
var ui = this._data.msgcount;
console.log('ppppp');
console.log(ui);
//this._data.tabs[index].msgcount = this._data.msgcount;
this.nav.push(Msg_subPage,{param1:page,param2:icon});
}


}
