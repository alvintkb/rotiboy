import { Component,ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-deals_sub',
  templateUrl: 'deals_sub.html'
})
export class Deals_subPage {
slides:any = [];

pag: any;
  constructor(private _cd:ChangeDetectorRef, public navParams: NavParams) {
this.slides = navParams.get('param2');
this.pag = navParams.get('param1');

   this.slides.forEach(element => {
     element.imgUrl = element.data.subpage;
            if (element.imgUrl == this.pag) {
                element.isSelected = true;
              }
              else
              element.isSelected = false;
            });
  }



    ionViewWillEnter(){
    console.log('ionViewDidLoad HomePage');
//this.slides.sort((a, b) => {
  //    if (a.pos < b.pos) return -1;
    //  else if (a.pos > b.pos) return 1;
    //  else return 0;
   // });
   // this._cd.detectChanges();
  }

  

}
