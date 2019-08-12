import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  password2 = new FormControl('', [Validators.required])

  register() {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('password') ? 'Not a valid password' :
            '';
  }

  getErrorMessagePassword2() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.password != this.password2 ? 'Not a valid password' :
            '';
  }

}
