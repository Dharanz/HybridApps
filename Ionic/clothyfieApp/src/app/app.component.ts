import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages = [ 
    {title: 'Home', component: ProfilePage},
    {title: 'Logout', component: HomePage}
  ];

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
    private storage: Storage) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title == "Logout") {
      this.storage.remove('username');
      this.storage.remove('password');
    }
    this.nav.setRoot(page.component);
  }

  goToProfile() {
    this.nav.push(ProfilePage);
  }
}

