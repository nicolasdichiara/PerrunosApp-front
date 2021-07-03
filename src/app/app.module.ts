import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { SubidaImagenPage } from './subidaImagen/subidaImagen.page';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SubidaImagenMascotaPage } from './subidaImagen-mascota/subidaImagenMascota.page';


import { firebaseConfig } from '../environments/firebaseConfig';
import { IonicStripeCheckoutModule } from '@vyconsulting/ionic-stripe-checkout';
import { environment } from '../environments/environment';
import { Deeplinks } from '@ionic-native/deeplinks/ngx/index'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx'
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ScrollingModule,
    IonicStripeCheckoutModule.forRoot({
      stripe_secret_key: environment.str_key,
      language: "en"
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Deeplinks,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
