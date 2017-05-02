import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { DataService } from '../providers/data/data.service';

@Injectable()
export class ProfileData {
  public userProfile: any;
  public currentUser: any;


  constructor(private _data:DataService) {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

  }

  getUserProfile(): any {
  //  return this.userProfile.child(this.currentUser.uid);
  return this.userProfile.child(this._data.userid);
  }

  updateName(Name: string): any {
    return this.userProfile.child(this._data.userid).update({
      displayName: Name,
    
    });
  }

updateUserid(userid: string): any {
    return this.userProfile.child(this._data.userid).update({
      userid: userid,
    });
  }

updatephotoURL(photoURL: string): any {
    return this.userProfile.child(this._data.userid).update({
      photoURL: photoURL,
    });
  }

  updateDOB(birthDate: string): any {
    return this.userProfile.child(this._data.userid).update({
      birthDate: birthDate,
    });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, password);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updateEmail(newEmail).then( user => {
        this.userProfile.child(this._data.userid)
          .update({ email: newEmail });
      });
    });
  }


  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }

}
