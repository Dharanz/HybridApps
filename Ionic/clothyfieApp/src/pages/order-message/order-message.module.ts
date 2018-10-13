import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderMessagePage } from './order-message';

@NgModule({
  declarations: [
    OrderMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderMessagePage),
  ],
})
export class OrderMessagePageModule {}
