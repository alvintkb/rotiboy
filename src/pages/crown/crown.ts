import { Component, ChangeDetectorRef } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { DataService } from '../../providers/data/data.service';

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
  selector: 'page-crown',
  templateUrl: 'crown.html'
})
export class CrownPage {

 
  querystr:string="";
  color:string="red";
  total:number=0;
  trans: FirebaseListObservable<any>;
  constructor(private _data:DataService,public af: AngularFire,public alertCtrl: AlertController,public nav: NavController,public actionSheetCtrl: ActionSheetController, private _cd:ChangeDetectorRef) {
    
  console.log('---one----');



this.getDeviceDetails();

  }
query()
{


console.log('zozo'+this.querystr);
    this.trans = this.af.database.list('/Crownlogs', {
      query: {
        orderByChild: 'uid',
        equalTo:this.querystr
     }
   })

this.trans.subscribe(snapshots=>{
  this.total=0;
        snapshots.forEach(itm => {
          if (!isNaN(parseFloat(itm.amount)))
          this.total += parseFloat(itm.amount);
         });
          this._cd.detectChanges();
    })

}

ionViewWillEnter()
{




}
ionViewDidEnter()
{
   console.log('---two----');
this._cd.detectChanges();
}

ionViewLoaded()
{
   console.log('---three----');
  this._cd.detectChanges();
}
 move_item(ele)
      {
        //store the object of the element which needs to be moved
   console.log(ele);
    
 
      }

  getDeviceDetails(){
  //    var model = Device.model;
      var deviceID = Device.uuid;
  //    var string = Device.version; 
      console.log(deviceID );
   }

getcolor(nn)
{
  if (nn > 0)
   return ("green");
  else
    return ("red");
}
format2dec(nn)
{
  let vv:number=0;
  if (!isNaN(parseFloat(nn)))
          vv += parseFloat(nn);
          else
         vv = 0;

return vv.toFixed(2);

}


addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'date',
          placeholder: 'date'
        },
          {
          name: 'description',
          placeholder: 'Description'
        },
          {
          name: 'amount',
          placeholder: 'Amount'
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
              date: data.date,
              description:data.description,
              amount:data.amount,
              key:'0_' + data.actiondate + '_' + data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

removeSong(songId: string,title:string){
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

updateSong(songId, date,description,amount){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'date',
          placeholder: 'YYYY-mm-dd',
          value: date
        },
         {
          name: 'description',
          placeholder: 'Description',
          value: description
        },
         {
          name: 'amount',
          placeholder: 'amount',
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
            this.removeSong(songId,description);
          }
        },{
          text: 'Update title',
          icon:'md-checkmark',
          handler: () => {
            this.updateSong(songId,date,description,amount);
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
