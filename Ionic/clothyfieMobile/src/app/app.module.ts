import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { ResetPasswordPage } from './../pages/reset-password/reset-password';
import { RegisterPage } from './../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoginProvider } from '../providers/login/login';

import { UIToast } from './../ui/toast.component';
import { UILoader } from '../ui/loader.component';

const firebaseConfig = {
  apiKey: "AIzaSyBJKvOx2bMOwk_V-66UhCzl9f9dQjKmoBk",
    authDomain: "clothyfie.firebaseapp.com",
    databaseURL: "https://clothyfie.firebaseio.com",
    projectId: "clothyfie",
    storageBucket: "clothyfie.appspot.com",
    messagingSenderId: "828480023152"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    RegisterPage,
    UIToast,
    UILoader
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(LoginPage),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    UIToast,
    UILoader
  ]
})
export class AppModule {}
