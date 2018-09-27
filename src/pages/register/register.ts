import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Profile } from '../../models/profile';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private formBuilder: FormBuilder) {
    this.initForm()
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
      username: [''],
      firstname: [''],
      lastname: ['']
    })
  }

  async register(user: User) {
    user = new User("",this.registerForm.value.email, this.registerForm.value.password, new Profile(this.registerForm.value.username, this.registerForm.value.firstname, this.registerForm.value.lastname))
    try {
      let result = await this.userProvider.create(user)
      user.id = result.user.uid
      console.log(user)
    } catch(error) {
      console.error(error)
    }
  }
}
