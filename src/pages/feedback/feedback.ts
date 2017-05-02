import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';


@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
msg:string;
omsg:string="xxx";
  constructor(public _data:DataService,public nav: NavController,public toastCtrl: ToastController) {

  }

presentToast() {
  let toast:any;
   if (this.msg.trim().length == 0)
   {
   toast = this.toastCtrl.create({
      message: 'your message is blank, nothing beeen send!',
      duration: 3000
    });
   }
   else{
   if (this.msg != this.omsg)
   {
    toast = this.toastCtrl.create({
      message: 'Your message has been sent. Thank you for the feedback.' +this.msg,
      duration: 3000
    });
   }
   else
   {
      toast = this.toastCtrl.create({
      message: 'Please do not send the same message twice!',
      duration: 3000
    });
   }
     this.omsg = this.msg;
   }
  this._data.updateMessage(this.msg,this._data.uid)
    toast.present();

  }
}


