
import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import { NavController } from 'ionic-angular';
import { Deals_subPage } from '../deals_sub/deals_sub';
@Component({
  selector: 'page-deals',
  templateUrl: 'deals.html'
})
export class DealsPage {
  public message: string;
  public direct: string;
  public items = [];
   

  constructor(private nav:NavController,private _data: DataService, private _cd:ChangeDetectorRef) {

  }

gotodeals_sub(page:string,items:any)
{
  console.log('kkk');
  console.log(page);
  console.log(items);
this.nav.push(Deals_subPage,{param1:page,param2:items});
}

ionViewWillEnter()
{
   console.log('**ionViewWillEnter**');
} 

  ionViewDidEnter() {
      console.log('**did enter**'); 
    // this can probably be improved with observables
    Promise.all([this.fetchMessage(), this.fetchDirect()]);

this._data.getDataObs('promolist').subscribe((data:Array<any>) => {
this.items = data;
this._cd.detectChanges();
})

    



  }


  private fetchMessage() {
    return new Promise(res => {
      // this method...
      console.log(this._data);
      this._data.db.child('static').on('value', data => {
        this.message = data.val();
        res();
      });
    });
  }

  private fetchDirect() {
    return new Promise(res => {
      // ...fetches the same data as this method
      this._data.staticData.on('value', data => {
        this.direct = data.val();
        res();
      });
    });
  }

}
