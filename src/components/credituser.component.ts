/**
 * Created by colinjlacy on 6/5/16.
 */
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { DataService } from '../providers/data/data.service';

@Component({
    selector: 'credituser',
    templateUrl: "credituser.component.html"
})
export class Credituser {
    public displayname: string="hello";

    public userEmail: string;
    public userPassword: string;

    constructor(private nav:NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController,private _data:DataService) {
 // var user = firebase.auth().currentUser;
 // console.log(user);
 // if (user)
  //  this.displayname = user.displayName;
this.displayname = _data.userid;
 //firebase.auth().onAuthStateChanged((user)=>{
  // if (user)
  // {
   //  console.log(user);
     //console.log(user.displayName);

 //    if (user.displayName!=undefined)
   //  {
  //  this.displayname = JSON.parse(user.displayName).username;
  //this.displayname = _data.username;
   //  }
 // }
 //})

    }


      showError(text) {
    setTimeout(() => {
    //  this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

 ionViewDidEnter() { // THERE IT IS!!!
   var user = firebase.auth().currentUser;
   if (user)
   {
     if (user.displayName == null)
      user = firebase.auth().currentUser;
  if (user.displayName == null)
      user = firebase.auth().currentUser;
  if (user.displayName == null)
      user = firebase.auth().currentUser;
  if (user.displayName == null)
      user = firebase.auth().currentUser;

    this.displayname = user.displayName;




   }
    }

public logout()
  {
  //     this.nav.push(RegisterPage );
      firebase.auth().signOut().then(function() {
   // this.nav.setRoot(AuthPage );
}, function(error) {
 //  An error happened.
});

 // this.nav.push(AuthPage );

  }

}
