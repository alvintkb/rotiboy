import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

export interface CourselItem {
  description: string;
  head:string;
  imgUrl?: string;
  color?: string;
  isSelected:boolean;
}

interface SlideItem {
  idx: number;
  description: string;
  imgUrl: string;
  color?: string;
  currentPlacement: number;
   isSelected:boolean;
 
}


@Component({
  selector: 'carousel',
  template: `
    <div class="carousel-container" style="height:300px">
      <div class="carousel">
        <div radio-group class="carousel-slide-item" 
        *ngFor="let item of items"
        [style.background-color]="item.color" 
        [ngStyle]="{'transform': 'rotateY(-'+item.currentPlacement+'deg)  translateZ('+tz+'px)', '-webkit-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+tz+'px)', '-ms-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+tz+'px)', 
        '-o-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+tz+'px)'}"
        (swipeleft)="onSwipeLeft($event);"
        (swiperight)="onSwipeRight($event);"
        >
        <div class="box"  >
       <img draggable="false" src="{{item.imgUrl}}" style="width:100px;height:100px;margin-top: 10px;" />
     <div style="font-size:12">
         <h5>{{item.head}}</h5>
   <h6>  {{item.description}} </h6>
         </div>
          </div>
        <!--div >
         <label for="a">Sign Up</label>
  <ion-checkbox [(ngModel)]="item.isSelected" (click)="selectItem(item)" >Sign Up</ion-checkbox>
     </div-->
        </div>
      </div>
     </div>
    
  `
})
export class CarouselComponent {
  private currentDeg: number = 0;
  private items: Array<SlideItem> = [];
  private tz: number;

  @Input() set slides(values: Array<CourselItem>) {
    if (!values.length) return;

    let degree: number = 0;
    this.tz = 250;//Math.round((this.containerWidth / 2) /
      //Math.tan(Math.PI / values.length));
      
      values.sort((a, b) => {
      if (a.isSelected < b.isSelected) return 1;
      else if (a.isSelected > b.isSelected) return -1;
      else return 0;
    });

    this.items = <Array<SlideItem>>values.map((item: CourselItem, index: number) => {
      let slideItem = {
        idx: index,
        description: item.description,
        head:item.head,
        imgUrl: item.imgUrl,
        color: item.color,
        currentPlacement: degree,
        isSelected:item.isSelected
      };
      degree = degree + 60;
      return slideItem;
    })



  }

  @Output() selectSlide = new EventEmitter();

  constructor(private eleRef: ElementRef) {
   }

  onSwipeLeft() {
    this.currentDeg = this.currentDeg - 60;
    this.applyStyle();
  }

  onSwipeRight() {
    this.currentDeg = this.currentDeg + 60;
    this.applyStyle();
  }

  private applyStyle() {
    let ele = this.eleRef.nativeElement.querySelector('.carousel');
    ele.style[ '-webkit-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ '-moz-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ '-o-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ 'transform' ] = "rotateY(" + this.currentDeg + "deg)";
  }

  selectItem(item:any){
    this.selectSlide.emit(item);
  }
} 