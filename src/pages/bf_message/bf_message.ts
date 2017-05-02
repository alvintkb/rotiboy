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
  selector: 'page-bf_message',
  templateUrl: 'bf_message.html'
})
export class Bf_MessagePage {

 

  color:string="red";
  total:number=0;
  trans: FirebaseListObservable<any>;
  constructor(public af: AngularFire,public alertCtrl: AlertController,public nav: NavController,public actionSheetCtrl: ActionSheetController, private _cd:ChangeDetectorRef) {

  this.trans = this.af.database.list('/message', {
      query: {
        orderByChild: 'title'
      }
    })

  //  this.trans.subscribe(()=>{
  //      console.log('zera---->>>');
   //       this._cd.detectChanges();
   // })


this.getDeviceDetails();

  }
ionViewWillEnter()
{
}
ionViewDidEnter()
{
this._cd.detectChanges();
}

ionViewLoaded()
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

addRecord(){
    let prompt = this.alertCtrl.create({
      title: 'Message',
      message: "Enter a message",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
          {
          name: 'type',
          placeholder: 'Type'
        },
          {
          name: 'text',
          placeholder: 'Text'
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
            this.trans.push({
              title: data.title,
              icon:data.Type,
              text:data.text,
              key:'0_' + data.actiondate + '_' + data.title + "-" + data.Type +"-" + data.text
            });
          }
        }
      ]
    });
    prompt.present();
  }

removeMessage(songId: string,title:string){
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

updateRecord(songId, title,icon,text){
    let prompt = this.alertCtrl.create({
      title: 'Message',
      message: "Update Message",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: title
        },
         {
          name: 'type',
          placeholder: 'B/V/C/P/E',
          value: icon
        },
         {
          name: 'text',
          placeholder: 'Text',
          value: text
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
              title: data.title,icon: data.type,contain:data.text     });
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
            this.removeMessage(songId,description);
          }
        },{
          text: 'Update title',
          icon:'md-checkmark',
          handler: () => {
            this.updateRecord(songId,date,description,amount);
          }
        },{
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
