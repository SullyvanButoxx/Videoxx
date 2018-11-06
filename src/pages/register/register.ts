import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UserProvider } from '../../providers/user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../models/profile';
import { ProfileProvider } from '../../providers/profile/profile';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private formBuilder: FormBuilder, private profileProvider: ProfileProvider) {
    this.initForm()
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      firstname: ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      lastname: ['',Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])]
    })
  }

  async register(user: User) {
    if (this.registerForm.valid) {
      user = new User("",this.registerForm.value.email, this.registerForm.value.password, new Profile(this.registerForm.value.username, this.registerForm.value.firstname, this.registerForm.value.lastname))
      try {
        await this.userProvider.create(user)
        await this.profileProvider.create(user.profile)
      } catch(error) {
        console.error(error)
      }
    } else {
      console.error("Formulaire non valide")
    }
  }
}
