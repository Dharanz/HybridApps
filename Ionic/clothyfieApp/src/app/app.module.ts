import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicStorageModule } from '@ionic/storage';
import { firebaseConfig } from './credentials';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginProvider } from '../providers/login/login';
import { ResetPasswordPage } from './../pages/reset-password/reset-password';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from './../pages/dashboard/dashboard';

import { UIToast } from '../ui/toast.component';
import { UILoader } from '../ui/loader.component';
import { ProfilePage } from '../pages/profile/profile';
import { OrdersPage } from '../pages/orders/orders';
import { OrderMessagePage } from '../pages/order-message/order-message';
import { ProductPage } from '../pages/product/product';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { ProductListingPage } from '../pages/product-listing/product-listing';
import { CategoryProvider } from '../providers/category/category';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResetPasswordPage,
    RegisterPage,
    DashboardPage,
    ProfilePage,
    OrdersPage,
    OrderMessagePage,
    ProductPage,
    ProductDetailsPage,
    ProductListingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResetPasswordPage,
    RegisterPage,
    DashboardPage,
    ProfilePage,
    OrdersPage,
    OrderMessagePage,
    ProductPage,
    ProductDetailsPage,
    ProductListingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    UIToast,
    UILoader,
    CategoryProvider
  ]
})
export class AppModule {}
