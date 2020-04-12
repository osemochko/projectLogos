import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public hide = true;
  public loginForm: FormGroup;
  public matcher: MyErrorStateMatcher;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) {
    this.hide = true;
    this.matcher = new MyErrorStateMatcher();
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [Validators.required])
    });    
   }

  ngOnInit(): void {
  }

  private openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {duration: 2000});
  }

  public submit(): void {
      if (this.loginForm.invalid) {
        return;
      }
      const {email, password} = this.loginForm.getRawValue();
      this.authService.login(email, password).subscribe(
        () => this.router.navigate(['basket']),
        ({error}) => this.openSnackBar(error.message, 'Error !')
      );
  }
}
