import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIToast } from '../../ui/toast.component';
import { LoginProvider } from '../../providers/login/login';
import { Users } from '../../models/users';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name; username; age; email; phone;
  address; password; conformPassword;

  registerValidation: FormGroup;

  constructor(public navCtrl: NavController, 
    private fb: FormBuilder, 
    private toast: UIToast, 
    private loginProvider: LoginProvider) {
      this.registerUserValidation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUserValidation() {
    this.registerValidation = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      phone: ['', Validators.required],
      conformPassword: ['', Validators.required],
      password: [''],
      address: ['', Validators.required]
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

  register() {
    if (this.password != this.conformPassword) {
      this.toast.presentToast('Passwords Does Not Match!!');
    }
    else {
      const register: Users = {
        name: this.name,
        mail: this.email,
        phone: this.phone,
        username: this.username,
        password: this.conformPassword,
        age: this.calculateAge(this.age),
        address: this.address
      }

      this.loginProvider.createUser(register);
      this.toast.presentToast('Account Has Been Created Succussfully!!');
      this.navCtrl.pop();
    }
  }

  calculateAge(age: any): Number {
    var ageDifMs = Date.now() - new Date(age).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
