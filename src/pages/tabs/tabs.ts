import { Component, ChangeDetectorRef } from '@angular/core';
import { HomePage } from '../home/home';
//import { AddonPage } from '../addon/addon';
import { DataService } from '../../providers/data/data.service';
//import { MorePage } from '../more/more';
import { DealsPage } from '../deals/deals';
import { GoogleMapsPage } from '../google-maps/google-maps';
import { NavController,Platform } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { PopoverController } from 'ionic-angular';
import {ProfilePage} from '../profile/profile'
import { FeedbackPage } from '../feedback/feedback';
import { Bf_FeedbackPage } from '../bf_feedback/bf_feedback';
import { CrownPage } from '../crown/crown';
import { Bf_MessagePage } from '../bf_message/bf_message';
import { Bf_MapPage } from '../bf_map/bf_map';
import { AccountPage } from '../account/account';
import { ContactPage } from '../contact/contact';

@Component({
   selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
 //  tab3Root: any = FeedbackPage;
  
  // this tells the tabs component which Pages
  // should be each tab's root Page
msgcount:any=0;
  constructor(public platform: Platform,private popoverCtrl: PopoverController,private nav: NavController,public authData: AuthData,private _cd:ChangeDetectorRef,private _data : DataService) {


//firebase.auth().onAuthStateChanged(function(user) {
 //    if (!user) {
  //      nav.setRoot(LoginPage);
    //    status += "s1";
   //  }
  // });

 _data.tabs = [
  { title: "Home", root: HomePage, icon: "myhome" ,msgcount:0},
  { title: "Deals", root: DealsPage, icon: "present",msgcount:0 },
  { title: "Stores", root: GoogleMapsPage, icon: "mypin" ,msgcount:0},
 // { title: "Edit Message", root: HomePage, icon: "chatbubbles" ,msgcount:0},
 // { title: "Message", root: MessagePage, icon: "chatbubbles" ,msgcount:0},
 // { title: "More", root: MorePage, icon: "ios-more",msgcount:0 }
 { title: "Contact", root: FeedbackPage, icon: "customicon",msgcount:0 },
];


  }
    exitApp(){
    this.platform.exitApp();
  }
 

  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

  toggle()
{
  console.log("----->happy");
 var ele = document.getElementById("mango");

if(ele.style.display == "block") 
{
            ele.style.display = "none";
}
  else
  ele.style.display = "block";
}

gotoprofilepicture()
{

 this.nav.push(ProfilePage );
}

gotobf_feedback()
{

 this.nav.push(Bf_FeedbackPage);
}

gotobf_crown()
{
 this.nav.push(CrownPage);
}

gotobf_message()
{
 this.nav.push(Bf_MessagePage);
}
gotobf_Map()
{
 this.nav.push(Bf_MapPage);
}
gotobf_Deals()
{
 this.nav.push(AccountPage);
}
gotobf_Users()
{
 this.nav.push(ContactPage);
}

}

