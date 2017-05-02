import { Component,ChangeDetectorRef } from '@angular/core';
import { NavController,LoadingController, AlertController ,NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { DateValidator } from '../../validators/date';
import { AuthData } from '../../providers/auth-data';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { TextValidator } from '../../validators/text';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign_up',
  templateUrl: 'sign_up.html'
})
export class Sign_upPage {
  loading: any;
slides:any = [];
public toast:any;
public signupForm;
pag: any;
  constructor( public toastCtrl: ToastController,public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController,public authData: AuthData, public formBuilder: FormBuilder,private _cd:ChangeDetectorRef,public nav: NavController, public navParams: NavParams) {
   this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      passwordconfirm: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      dateofbirth: ['', Validators.compose([Validators.required, DateValidator.isValid])],
      username: ['', Validators.compose([Validators.required])],
      userid: ['', Validators.compose([Validators.required, TextValidator.isValid, Validators.minLength(4)])]
    })


    this.pag = navParams.get('param1');
if (this.pag == undefined)
this.pag = 0;
   this.slides = [
     {
      id: 0,
      head:'BONUS CREDITS WITH VOUCHER PURCHASE',
      description: `Royalty members who Purchase Pre Paid
Rotiboy Vouchers will be entitled to
between x% to y% BONUS Credits`,
      color: 'rgba(0,0,0,0)',
      isSelected: false,
      imgUrl: 'bonus.svg'
    
    },
     {
      id: 1,
      head:'DOUBLE BONUS CROWNS',
      description: 'The 1st 1000 e-voucher purchase will enjoy double bonus credits.',
      color: 'rgba(0,0,0,0)',
      isSelected: false,
      imgUrl: 'bonus.svg'
    
    },
    {
      id: 2,
      head:'CASH BACK WITH PURCHASES',
      description: 'Royalty members who Purchase Pre Paid Rotiboy Vouchers will be entitled to a minimum of 2% rebate on all retail purchases at Rotiboy outlets.',
      color: 'rgba(0,0,0,0)',
      isSelected: false,
      imgUrl: 'cashback.svg'
  
    },
    {
      id: 3,
      head:'EXCLUSIVE PROMOTIONS',
      description: 'We track your purchases and the more you enjoy Rotiboy products, you will be entitled to enjoy more Exclusive Promotions.',
      color: 'rgba(0,0,0,0)',
      isSelected: false,
      imgUrl: 'promo.svg'
   
    },
    {
      id: 4,
      head:'BIRTHDAY GIFTS',
      description: `Rotiboy will reward you with a birthday gift every year.`,
      color: 'rgba(0,0,0,0)',
      isSelected: false,
      imgUrl: 'birth.svg'
    
    },
    {
      id: 5,
      head:'EXCLUSIVE INVITATION TO ROTIBOY EVENTS',
      description: 'Rotiboy will reward you with Invitations to Exclusive Rotiboy events.',
      color: 'rgba(0,0,0,0)',
      isSelected: false,
      imgUrl: 'event.svg'
    
    }
   
  ];

this.slides[parseInt(this.pag)].isSelected = true;

 //this.slides[this.pag].isSelected = true;
this.signupForm.value.dateofbirth = "1900-01-01"; 
  }

selectProducer(producer: any) {
  alert(producer);
  console.log('immmhere');
 //   this.navCtrl.setRoot(QuestionsComponent, {
  //    producer: producer
  //  });
    // this.slides.forEach(ele => {
    //   if (ele.id == producer.idx) {
    //     ele.isSelected = true;
    //     this.navCtrl.setRoot(QuestionsComponent, {
    //       producer: producer
    //     });
    //   }
    // })
  }

//  ionViewDidLoad() {
    ionViewWillEnter(){
    console.log('ionViewDidLoad HomePage');
//this.slides.sort((a, b) => {
  //    if (a.pos < b.pos) return -1;
    //  else if (a.pos > b.pos) return 1;
    //  else return 0;
   // });
   // this._cd.detectChanges();
  }

 signupUser(){
    if (!this.signupForm.valid){
      if (!this.signupForm.value.email) 
      {
      this.toast = this.toastCtrl.create({
      message: 'Please enter Email',
      duration: 3000
    });
    this.toast.present();
      } else if (!this.signupForm.value.password) 
      {
      this.toast = this.toastCtrl.create({
      message: 'Please enter Password',
      duration: 3000
    });
    this.toast.present();
      } else if (!this.signupForm.value.passwordconfirm) 
      {
      this.toast = this.toastCtrl.create({
      message: 'Please enter Password Confirmation',
      duration: 3000
    });
    this.toast.present();
      } else if (!this.signupForm.value.username) 
      {
      this.toast = this.toastCtrl.create({
      message: 'Please enter User Name',
      duration: 3000
    });
    this.toast.present();
      } else if (!this.signupForm.value.dateofbirth) 
      {
      this.toast = this.toastCtrl.create({
      message: 'Please enter Date Of Birth',
      duration: 3000
    });
    this.toast.present();
      }
      
    
    
    
  } else {
   //  let username = '{"username":"'+ this.signupForm.value.username  +'","dateofbirth":"'+this.signupForm.value.dateofbirth + '"}';
  //console.log(this.signupForm.value.dateofbirth);
  let dates = this.signupForm.value.dateofbirth;
dates = dates.replace('/','-');
dates = dates.replace('/','-');
dates = dates.split('-');



 let datess = dates[2] + "-" + dates[1] + "-" + dates[0];
console.log(datess);

      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password,this.signupForm.value.username,datess,this.signupForm.value.userid)
      .then(() => {
//uu.updateProfile({
  //displayName: "Jane Q. User",
 // photoURL: "https://example.com/jane-q-user/profile.jpg",
 // momo: "koko"
//}).then(function() {
  // Update successful.
//}, function(error) {
  // An error happened.
//});

        this.loading.dismiss().then( () => {
            this.nav.setRoot(TabsPage);
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

updateDOB()
{

}
}
