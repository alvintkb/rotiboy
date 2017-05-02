import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/index';

@Component ({
    template: `
            <ion-card-content>
                Hello
            </ion-card-content>
       
    `
})
export class MapinfoPage {

  private dumbData: number;

  constructor(private params: NavParams) {
   console.log("constructor");
   this.dumbData= 22;
   console.log('Param:', params.get('param'));
 }
  
}
  
