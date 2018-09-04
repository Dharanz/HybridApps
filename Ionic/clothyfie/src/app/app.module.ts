import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditFormComponent } from './components/users/edit-form/edit-form.component';
import { UsersService } from './services/users.service';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';

var appRoute: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    EditFormComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'clothyfie'),
    AngularFirestoreModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
