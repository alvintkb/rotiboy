import { Component } from '@angular/core';
import { IMarker, IPoint } from './interfaces';
import {ModalController,NavController} from 'ionic-angular/index';
import { MapinfoPage } from '../mapinfo/mapinfo';
import firebase from 'firebase';

@Component ({
	 selector: 'page-google-maps',
	templateUrl: 'google-maps.html',
	
})

export class GoogleMapsPage {
	public markers: IMarker[]=[];
	public marker:IMarker;
	public markerso: any;
	public origin: IPoint;
	public zoom: number;
	public title: string="happy com";
	public address: string;
	public tel: string;
	public opday: string; // operation day
	public ophour:string;
    mapinfo: any;

	constructor(public nav:NavController,public md:ModalController) {
		 this.mapinfo = firebase.database().ref('mapinfo');
//this.mapinfo.on('value', function(snapshot) {
//  this.markers = snapshot.val();
// console.log('****');
// console.log(this.markers);
//});

 this.mapinfo.ref.once('value', (snapshot)=> {
 this.markerso = snapshot;
 this.markerso.forEach((v)=> {
 this.markers.push(v.val());
});
  
}, (error) => {
  // The callback failed.
 // console.error(error);
});

	//	this.initMarkers();
	this.mapinit();
		this.origin = {
			lat: 4.026760,
			lng: 101.022690
		};
		this.zoom = 6;
	}

mapinit()
{
 
 //this.mapinfo.subscribe(snapshot => {
     //   console.log('Snapshot type result: ' + snapshot[type]);
        //this.index = snapshot[type];
//this.markers = snapshot;

     //   this.index = snapshot.requests;
   // });







// this.mapinfo.	ref.child('blogposts').child(id).once('value', function(snapshot) {
  // The callback succeeded; do something with the final result.
//  renderBlog(snapshot.val());
//}, function(error) {
  // The callback failed.
  //console.error(error);
//);

}


public hello(title:string,address:string,tel:string,ophour:string)
{
	console.log('hihi');
this.title = title;
this.address = address;
this.tel = tel;
this.ophour = ophour;
let	e = document.getElementById("container");

	e.style.display = (e.style.display == 'block') ? "none":'block';
}
	

 callmodal()
 {
let mymodal =   this.md.create(MapinfoPage)
//alert(document.getElementById("popo").parentElement.nodeName);
  
mymodal.present();
 }

	private initMarkers(): void {
		this.markers = [{
        	lat: 4.227760,
			lng: 101.022690,
			label: 'A',
			title:'One Utama',
			tel:'03-7731 7350',
			address:'LG353A, 1 Utama Shopping Centre 1 Lebuh Bandar Utama, Bandar Utama, 47800 Petaling Jaya',
			ophour:'9:00am – 10:00pm',
			opday:'Monday - Sunday'
		}, {
			lat: 4.026760,
			lng: 101.154690,
			label: 'B',
			title:'KLCC',
				tel:'',
			address:'C69, Suria KLCC Shopping Centre,Jalan Ampang 50450 Kuala Lumpursdsdasdas',
			ophour:'9:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
		{
		    lat: 4.448091,
			lng: 103.448166,
			label: 'B',
			title:'Mesra Mall Kerteh',
				tel:'09 – 8643667',
			address:'Lot RE S2, Ground Floor, Mesra Mall Kerteh, Lot 6490, Jalan Kemaman-Dungun, Kemasik, 24200 Terengganu',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
		{
			lat: 5.310678,
			lng:  103.128273,
			label: 'B',
			title:'Rotiboy Giant',
				tel:'09 – 622 7742',
			address:'Lot No G 7,Giant Hypermarket, Kuala Terengganu, H.S(D) 6917, Lot PT 1485, Jalan Padang Hiliran, Cabang Tiga,21100 Kuala Terengganu, Terengganu',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
		{
			lat: 3.818168,
			lng: 103.326258,
			label: 'B',
			title:'East Coast Mall',
				tel:'09 – 560 9402',
			address:'Lot No GF – 08a & 08a Alfresco, Jalan Putra Square 6, Putra Square, 25200 Kuantan Pahang .',
			ophour:'10am – 10pm',
			opday:'Monday - Sunday'
		},
        {
			lat: 4.617075,
			lng: 101.119147,
			label: 'B',
			title:'Tesco Ipoh',
				tel:'05-54505168',
			address:'Lot G-09, Tesco Mall Ipoh, No 2, Jalan Jambu, Taman Teh Teng Seng, 31400 Ipoh, Perak, Malaysia',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
      
       {
			lat: 3.197211,
			lng: 101.741221,
			label: 'B',
			title:'Wangsa Walk',
				tel:'03-41313977',
			address:'Lot G-33, Wangsa Walk Mall, Wangsa Avenue, 9, Jalan Wangsa Pedana 1, Bandar Wangsa Maju 53300 Kuala Lumpur',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
    {
			lat: 3.117868,
			lng: 101.677132,
			label: 'B',
			title:'Midvalley',
				tel:'03-2201822',
			address:'Lot F028B, Midvalley Shopping Centre,Midvalley city, Lingkaran Syed Putra,59200 Kuala Lumpur',
			ophour:'9:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
     {
			lat:3.082626,
			lng:101.585738,
			label: 'B',
			title:'Subang Parade',
				tel:'03-56117557',
			address:'Lot 10A(1), Subang Parade Shopping Centre, No. 5, Jalan SS16/1, 47500 Subang Jaya,Selangor',
			ophour:'8.00am – 10:00pm',
			opday:'Monday - Sunday'
		},
    
		   {
			lat:2.939231 ,
			lng:101.711329,
			label: 'B',
			title:'Alamanda Putrajaya',
				tel:'03-88611894',
			address:'Lot LG71, Alamanda Shopping Centre, Jalan Alamanda Precinct 1, 62000 Putrajaya',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
       {
			lat: 1.462731,
			lng:  103.764578,
			label: 'B',
			title:'JB Sentral',
				tel:'07-2221566',
			address:'No.5, Level 3, JB Sentral, Jalan Jim Quee, 80300 Johor Bahru',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
        {
			lat: 3.109432,
			lng: 101.459556,
			label: 'B',
			title:'Setia City Mall',
		    tel:'03-3358 3406',
			address:'Lot LG-66, Setia City Mall, No 7, Persiaran Setia Dagang, Bandar Setia Alam, Seksyen U13, 40170 Shah Alam, Selangor',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
 
		   {
			lat: 3.191780, 
			lng: 101.770247,
			label: 'B',
			title:'Petronas Bukit Antarabangsa',
				tel:'03-4161 5232',
			address:'Lot PT 3429,Jalan Wangsa 2, Bukit Antarabangsa, 68000 Ampang, Selangor',
			ophour:'7:30am – 10:00pm',
			opday:'Monday - Sunday'
		},
 {
			lat: 3.160163,
			lng: 101.754341,
			label: 'B',
			title:'Petronas Kolam Ayer',
				tel:'03-42669666',
			address:'Lot 36904, Jalan Kolam Air Lama, Mukim Ampang, 68000 Ampang, Selangor',
			ophour:'8:00am – 11:00pm',
			opday:'Monday - Sunday'
		},
{
			lat: 3.158783,
			lng: 101.714486,
			label: 'B',
			title:'Wisma Central',
				tel:'03-28567103',
			address:'Lot 1.09 & 1.10,Jalan Ampang, Wisma Central,50088 Kuala Lumpur',
			ophour:'7:00am – 9:00pm',
			opday:'Monday - Sunday'
		},
		
		  {
			lat: 4.327053,
			lng: 101.145223,
			label: 'B',
			title:'Kampar',
				tel:'',
			address:'2191, Jalan Timah, Taman Bandar baru, 31900 Kampar, Perak',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
{
			lat: 3.132404,
			lng: 101.686827,
			label: 'B',
			title:'Menara Allianz Sentral',
				tel:'03-22761166',
			address:'LG3, Menara Allianz Sentral, No. 203, Jalan Tun Sambanthan, 50470 Kuala Lumpur Sentral',
			ophour:'7.30am – 9:00pm',
			opday:'Monday - Sunday'
		},
  {
			lat: 4.670330,
			lng: 101.072890,
			label: 'B',
			title:'Terminal Amanjaya Ipoh',
				tel:'05-526 3953',
			address:'Lot 23, Ground Floor, Kompleks Terminal Amanjaya, No 1, Persiaran Meru Raya 5, Bandar Meru Jaya, 30020, Ipoh Perak',
			ophour:'9:00am – 11:00pm',
			opday:'Monday - Sunday'
		},
		  {
			lat: 4.196721,
			lng: 101.262994,
			label: 'B',
			title:'Tapah',
				tel:'011-23074674',
			address:'No. 91 Jalan Baldwin 3, Pusat Perniagaan Baldwin, 35000 Tapah, Perak Darul Ridzuan ',
			ophour:'10:00am – 10:00pm',
			opday:'Monday - Sunday'
		},
        {
			lat: 4.020229,
			lng: 101.022374,
			label: 'B',
			title:'Teluk Intan',
				tel:'03-89326984',
			address:'No 9A, Jalan Laman Intan, Bandar Baru 36000, Teluk Intan, Perak, Malaysia.',
			ophour:'9:00am – 10:00pm',
			opday:'Monday - Sunday'
		}
		];
	}

	
}
