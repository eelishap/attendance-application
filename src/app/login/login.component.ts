import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  public createForm(): FormGroup {
    return this.fb.group({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  public login(): void {
    const user = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }

    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe((res: any) => {
      if(res) {
        this.route.navigate(['/dashboard'])
        localStorage.setItem('userId', res.id)
      } else {
        alert('Authentication Failed')
      }
    });
  }

}
