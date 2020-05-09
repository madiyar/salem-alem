import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;
  authFailed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }

    if(!this.form.valid) {
      return;
    }
    
    if(this.form.get('email').value === 'im@madiyar.ml' && this.form.get('password').value === '12345678') {
      this.authFailed = false;
      this.router.navigate(['/main']);
    } else {
      this.authFailed = true;
    }
  }

  resetError(): void {
    this.authFailed = false;
  }
}
