import { NavController, AlertController } from 'ionic-angular';
import { Component, ChangeDetectorRef  } from '@angular/core';
import { ProfileData } from '../../providers/profile-data';
import { AuthData } from '../../providers/auth-data';
import {CameraPage} from '../camera/camera';
import { DataService } from '../../providers/data/data.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;

  user;
 //  cameraData: string;

  constructor(public _cd:ChangeDetectorRef,public _data:DataService,public nav: NavController, public profileData: ProfileData,
    public authData: AuthData, public alertCtrl: AlertController) {
   //   this.username = JSON.parse(_data.displayName).username;
  //    this.birthDate = JSON.parse(_data.displayName).dateofbirth;
     
    // this.username = _data.username;
    // this.birthDate = _data.birthDate;
   //  this.email = _data.email;
     
  }

ionViewWillEnter()
{
     this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.dateofbirth;
    });
}
 ionViewDidEnter(){

  }

  close(){
    this.nav.pop();
    }
gotophotoedit()
{
    this.nav.push(CameraPage);
}
  updateName(){
    let alert = this.alertCtrl.create({
      message: "Your name",
      inputs: [
        {
          name: 'Name',
          placeholder: 'Your name',
          value: this.userProfile.displayName
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateName(data.Name);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate){
    this.profileData.updateDOB(birthDate);
  }

  updateEmail(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Your old password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }
}