import { Component, ChangeDetectorRef } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {Device} from 'ionic-native';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bf_feedback',
  templateUrl: 'bf_feedback.html'
})
export class Bf_FeedbackPage {

 

  color:string="red";
  total:number=0;
  trans: FirebaseListObservable<any>;
  constructor(public af: AngularFire,public alertCtrl: AlertController,public nav: NavController,public actionSheetCtrl: ActionSheetController, private _cd:ChangeDetectorRef) {
  this.trans = this.af.database.list('/private/feedback', {
      query: {
        orderByChild: 'date'
      }
    })


this.getDeviceDetails();

  }

ionViewWillEnter()
{
   this._cd.detectChanges();
}
 move_item(ele)
      {
        //store the object of the element which needs to be moved
   console.log(ele);
      }

  getDeviceDetails(){
      var deviceID = Device.uuid;
      console.log(deviceID );
   }

removeRecord(songId: string,title:string){
    let prompt = this.alertCtrl.create({
      title: 'Delete',
      message: title,
  
      buttons: [

        {
          text: 'Delete',
          handler: data => {
             this.trans.remove(songId);
                 }
        },{
          text: 'Cancel',
          role: 'cancel',
      //    icon : 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    prompt.present();
   
  }

updateRecord(songId, date,description,amount){
    let prompt = this.alertCtrl.create({
      title: 'Feedback Message',
      message: "Update Message",
      inputs: [
        {
          name: 'date',
          placeholder: 'YYYY-mm-dd',
          value: date
        },
         {
          name: 'Message',
          placeholder: 'Message',
          value: description
        },
         {
          name: 'UID',
          placeholder: 'UID',
          value: amount
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.trans.update(songId, {
              date: data.date,description: data.description,amount:data.amount     });
          }
        }
      ]
    });


    prompt.present();
  }

 showOptions(songId, date,description,amount) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Task',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeRecord(songId,description);
          }
        },
      //  {
      //    text: 'Update title',
      //    icon:'md-checkmark',
      //    handler: () => {
      //      this.updateRecord(songId,date,description,amount);
       //   }
       // },
          {
          text: 'Cancel',
          role: 'cancel',
          icon : 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
        
        
      ]
    });
    actionSheet.present();
  }

 // ionViewDidLoad() {
  //  console.log('ionViewDidLoad AccountPage');
 // }

}
