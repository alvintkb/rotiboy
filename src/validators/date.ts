import {FormControl} from '@angular/forms';

export class DateValidator {

    static isValid(control: FormControl){

      var re = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(control.value);
      
console.log('check date'+control.value);
console.log(re);
      if (re){
        return null;
      }
console.log('invalidate true');
      return {"invalidDate": true};
    }

}




