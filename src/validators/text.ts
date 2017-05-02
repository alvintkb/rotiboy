import {FormControl} from '@angular/forms';

export class TextValidator {

    static isValid(control: FormControl){

      var re = /^[a-z0-9_-]{3,15}$/.test(control.value);
      

      if (re){
        return null;
      }
console.log('invalidate true');
      return {"invalidText": true};
    }

}



