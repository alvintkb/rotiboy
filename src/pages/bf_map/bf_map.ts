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
  selector: 'page-bf_map',
  templateUrl: 'bf_map.html'
})
export class Bf_MapPage {
  color:string="red";
  total:number=0;
  trans: FirebaseListObservable<any>;
  constructor(public af: AngularFire,public alertCtrl: AlertController,public nav: NavController,public actionSheetCtrl: ActionSheetController, private _cd:ChangeDetectorRef) {
    
  console.log('---one----');
  this.trans = this.af.database.list('/mapinfo', {
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
      var string = Device.version; 
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
          name: 'lng',
          placeholder: 'lng'
        },
          {
          name: 'title',
          placeholder: 'title'
        },
          {
          name: 'tel',
          placeholder: 'tel'
        },  {
          name: 'address',
          placeholder: 'address'
        },
          {
          name: 'ophour',
          placeholder: 'ophour'
        },
          {
          name: 'opday',
          placeholder: 'opday'
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

updateRecord(songId, title,lat,lng,tel,address,ophour,opday){
    let prompt = this.alertCtrl.create({
      title: 'Branch Info',
      message: "Update info for this branch",
      inputs: [
        {
          name: 'titile',
          placeholder: 'title',
          value: title
        },
         {
          name: 'lat',
          placeholder: 'lat',
          value: lat
        },
         {
          name: 'lng',
          placeholder: 'lng',
          value: lng
        },
         {
          name: 'tel',
          placeholder: 'tel',
          value: tel
        },
         {
          name: 'address',
          placeholder: 'address',
          value: address
        },
         {
          name: 'ophour',
          placeholder: 'ophour',
          value: ophour
        },
         {
          name: 'opday',
          placeholder: 'opday',
          value: opday
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
              title: data.title,lat: data.lat,lng:data.lng,tel:data.tel,address:data.address,ophour:data.ophour,opday:data.opday});
          }
        }
      ]
    });


    prompt.present();
  }

 showOptions(songId,  title,lat,lng,tel,address,ophour,opday) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Task',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeRecord(songId, title);
          }
        },{
          text: 'Update title',
          icon:'md-checkmark',
          handler: () => {
            this.updateRecord(songId, title,lat,lng,tel,address,ophour,opday);
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
