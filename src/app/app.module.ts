import { NgModule,CUSTOM_ELEMENTS_SCHEMA , ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
// Import pages
import { HomePage } from '../pages/home/home';
import { HomebasicPage } from '../pages/homebasic/homebasic';
import { eventhomePage } from '../pages/eventhome/eventhome';
import { EventCreatePage } from '../pages/event-create/event-create';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { EventListPage } from '../pages/event-list/event-list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { Sign_upPage } from '../pages/sign_up/sign_up';

// Import providers
import { AuthData } from '../providers/auth-data';
import { EventData } from '../providers/event-data';
import { ProfileData } from '../providers/profile-data';
import { TabsPage } from '../pages/tabs/tabs';
import { DataService } from '../providers/data/data.service';
import { TransactionPage } from '../pages/transaction/transaction';
import { Storage } from '@ionic/storage';
import { FeedbackPage } from '../pages/feedback/feedback';
import { Credituser } from '../components/credituser.component';
import { DealsPage } from '../pages/deals/deals';
import { Deals_subPage } from '../pages/deals_sub/deals_sub';
import { MessagePage } from '../pages/message/message';
import {Msg_subPage} from '../pages/msg_sub/msg_sub';
import { GoogleMapsPage } from '../pages/google-maps/google-maps';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapinfoPage } from '../pages/mapinfo/mapinfo';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { CarouselpicComponent } from '../components/carouselpic/carouselpic.component';
//import { QRCodeModule } from 'angular2-qrcode';
import { QRCodeComponent } from '../components/angular2-qrcode/angular2-qrcode.component';
import { CameraPage } from '../pages/camera/camera';
import { CrownPage } from '../pages/crown/crown';
import { AccountPage } from '../pages/account/account';
import { Bf_MessagePage } from '../pages/bf_message/bf_message';
import { Bf_FeedbackPage } from '../pages/bf_feedback/bf_feedback';
import { Bf_MapPage } from '../pages/bf_map/bf_map';
import { AngularFireModule } from 'angularfire2';
import { AddContactPage } from '../pages/add-contact/add-contact';
import { ContactPage } from '../pages/contact/contact';
import {CloudModule, CloudSettings} from "@ionic/cloud-angular";
import { BrowserModule } from '@angular/platform-browser';

const cloudSettings: CloudSettings = {
 'core': {
   'app_id': 'b5c67797'
 }
};

  const firebaseConfig={
    apiKey: "AIzaSyB15k9zkAp8zYVPSbXJcOhQvPhkLle74wA",
    authDomain: "helloworld-feb2b.firebaseapp.com",
    databaseURL: "https://helloworld-feb2b.firebaseio.com",
    storageBucket: "helloworld-feb2b.appspot.com",
 //   messagingSenderId: "429759287492"

    };

@NgModule({
     schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    CrownPage,
    Bf_MessagePage,
    Bf_FeedbackPage,
    Bf_MapPage,
    AccountPage,
    MyApp,
    HomePage,
    HomebasicPage,
    eventhomePage,
    EventCreatePage,
    EventDetailPage,
    EventListPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    Sign_upPage,
    TabsPage,
    TransactionPage,
    FeedbackPage,
    Credituser,
    DealsPage,
 //   News_subPage,
    MessagePage,
    Msg_subPage,
    GoogleMapsPage,
    MapinfoPage,
    CarouselComponent,
    CarouselpicComponent,
    Deals_subPage,
    CameraPage,
    QRCodeComponent,
    AddContactPage,
    ContactPage
  ],
  imports: [
      AngularFireModule.initializeApp(firebaseConfig),
      BrowserModule,
      IonicModule.forRoot(MyApp),
       CloudModule.forRoot(cloudSettings),
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAU0dh2bxhWLBkDqedqcfM_vAmrff2S7w'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CrownPage,
    Bf_MessagePage,
    Bf_FeedbackPage,
    Bf_MapPage,
    AccountPage,
    MyApp,
    HomePage,
    HomebasicPage,
    eventhomePage,
    EventCreatePage,
    EventDetailPage,
    EventListPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    Sign_upPage,
    TabsPage,
    TransactionPage,
    FeedbackPage,
    DealsPage,
  //  News_subPage,
    MessagePage,
    Msg_subPage,
    GoogleMapsPage,
    MapinfoPage,
    Deals_subPage,
    CameraPage,
    AddContactPage,
    ContactPage 
  ],
  providers: [SplashScreen, {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    EventData,
    ProfileData,
    DataService,
    Storage
    ]
})
export class AppModule {
 
  
}

