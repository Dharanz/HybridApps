import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';

@Component({
    selector: 'page-UILoader',
    template: ''
})
export class UILoader {

    public loading: Loading;

    constructor(private loadingCtrl: LoadingController) {
    }

    presentLoader() {
        this.loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Please wait...'
        });

        this.loading.present();
      }
}