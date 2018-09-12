import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditFormComponent } from './components/users/edit-form/edit-form.component';
import { UsersService } from './services/user/users.service';
import { ProductService } from './services/product/product.service';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { EditProductComponent } from './components/product-details/edit-product/edit-product.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';

var appRoute: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'productDetails', component: ProductDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    EditFormComponent,
    LoadingSpinnerComponent,
    ProductDetailsComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'clothyfie'),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    BrowserAnimationsModule, ToasterModule.forRoot()
  ],
  providers: [
    UsersService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
