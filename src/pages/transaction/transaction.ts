
import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../providers/data/data.service';

@Component({
  selector: 'TransactionPage',
   templateUrl: 'transaction.html'
})
export class TransactionPage {

  public message: string;
  public direct: string;
    public items = [];
   

  constructor(private _data: DataService, private _cd:ChangeDetectorRef) {}

  ionViewDidEnter() {
    // this can probably be improved with observables
    Promise.all([this.fetchMessage(), this.fetchDirect()]);

this._data.getDataObs("Crownlogs").subscribe((data:Array<any>) => {
console.log(data);
this.items = data;

console.log(this.items);
   this._cd.detectChanges();
})
//function gogo(sref)
//{
 //   $state.go('tabsController.detail',{'contain':sref});
//}
    



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
