/**
 * Created by colinjlacy on 6/5/16.
 */
import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {Observable} from 'rxjs/observable';
import { Storage } from '@ionic/storage';

  
//const msgcount$;

@Injectable()
export class DataService {
    public db: any;
    public staticData: any;
    public privateData: any;
    public status: boolean;
    public msgcount: number;
    public photoURL:string;
    public uid:string;
    public userid:string;
    public birthDate:string;
    public email:string;
    public displayName:string;
    public isonline:boolean;
  //   public msgcount$=null;

public tabs:any=[];  
    constructor(private storage: Storage) {
      
    }



    init() {
      
  //this.storage.remove('message').then(() => {
  //    console.log('name has been removed');
  //  });
 // const fbConf = {
 //   apiKey: "AIzaSyB15k9zkAp8zYVPSbXJcOhQvPhkLle74wA",
 //   authDomain: "helloworld-feb2b.firebaseapp.com",
  //  databaseURL: "https://helloworld-feb2b.firebaseio.com",
  //  storageBucket: "helloworld-feb2b.appspot.com",
 //   messagingSenderId: "429759287492"
//  };
 
  //    firebase.initializeApp(fbConf);

      this.db = firebase.database().ref('/');
      this.staticData = firebase.database().ref('/static');
      this.privateData = firebase.database().ref('/private');
    //   this.msgcount$ = Rx.Observable.from(this.msgcount); 

    }



updateMessage(msg: string,uid:string): any {
    return this.privateData.child('feedback/'+this.generateUUID() ).update({
      message: msg,
      uid:uid,
      date:this.getdate(),
      time:(new Date).toLocaleTimeString(),
      timestamp:new Date().getTime()
    });
  }

getdate()
{
var today = new Date();
let dd = today.getDate();

//The value returned by getMonth is an integer between 0 and 11, referring 0 to January, 1 to February, and so on.
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
let sdd = dd.toString();
if(dd<10) 
{
    sdd='0'+dd;
} 

let smm = mm.toString();
if(mm<10) 
{
    smm='0'+mm;
} 
return sdd+'-'+smm+'-'+yyyy;

}


generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


updateDataObs_isread_true(db, id) {
		var storeArr = [];
	this.storage.get(db).then((val) => {
		storeArr = val;
        storeArr.forEach(aval => {
		if (aval.id == id) {
             if (!aval.isread)
            {
            this.msgcount--;
            var index = this.tabs.map(function(d) { return d['title']; }).indexOf('Deals');
            this.tabs[index].msgcount = this.msgcount;
            aval.isread = true;
            }
		}
	});
    	this.storage.set(db, storeArr);
	});

	return;
}

  getMsgSyn_store(db) {
  	var ref = this.db.child(db);
      console.log('================>>>>>>>>ko');
    var storeArr = [];
     console.log('old-A');
  	return new Observable(observer => {
                console.log('================>>>>>>>>ko1');
            console.log(storeArr);
       	this.storage.get('message').then((val) => {
       if (val != null)
  		storeArr = val;

         console.log('================>>>>>>>>ko2');
            console.log(storeArr);
           
	ref.on('value',
  			(snapshot) => {
  			var FireArr = [];
      console.log('================>>>>>>>>ko3');
  			snapshot.forEach(function (childSnapshot) {
  				FireArr.push({
  					id: childSnapshot.key,
  					isread: false,
  					data: childSnapshot.val()
  				});
  			});
  			//***** add new record */
                  console.log('================>>>>>>>>ko4');
            console.log(FireArr);
            console.log(storeArr);
  			FireArr.forEach(aval => {
  				var rec = storeArr.filter(x => x.data.contain == aval.data.contain)[0];
      				if (!rec) {
  					console.log("add new record" + aval.data);
  					storeArr.push(aval);
  				}
  			})
               console.log('old2');
               console.log(storeArr);
  			var missrec = [];
  			storeArr.forEach(aval => {
  				var rec = FireArr.filter(x => x.data.contain == aval.data.contain)[0];
  				if (!rec) {
  					missrec.push(aval.id);
  				}
  			})
             // remove unmatch record
  			missrec.forEach(aval => {
                  console.log("remove:" + aval);
  				storeArr.splice(aval, 1);
  			})
            console.log('storege');
            console.log(storeArr);
  			this.storage.set('message', storeArr);
  			this.msgcount = 0;
  			storeArr.forEach(aval => {
  				if (!aval.isread)
  					this.msgcount++;
  			})
  			observer.next(storeArr);
                  console.log('================>>>>>>>>ko8');
  		},
  			(error) => {
  			observer.error(error)
  		});
                console.log('================>>>>>>>>ko9');
  	});

  	    console.log('================>>>>>>>>ko10');
});
 
  }

    getDataObs(db) {
    var ref = this.db.child(db)
    //  ref = ref.child(_id)

    return new Observable(observer => {
        ref.on('value',
            (snapshot) => {
                var arr = []

                snapshot.forEach(function(childSnapshot) {
           
                    arr.push({
                       id: childSnapshot.key,
                        data: childSnapshot.val()
                    });
                });
                observer.next(arr)
            },
            (error) => {
                console.log("ERROR:", error)
                observer.error(error)
            });
    });
}
}
