import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-UIToast',
    template: ''
})
export class UIToast {

    constructor(private toastCtrl: ToastController) {
    }

    presentToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'top'
        });

        toast.present();
    }
}