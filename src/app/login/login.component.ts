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
  public showAttendanceModal: boolean = false;
  private userId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createForm();
    this.userId = Number(localStorage.getItem('userId'));
    this.showAttendanceModal = this.userId ? true : false;
  }

  public createForm(): FormGroup {
    return this.fb.group({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  public login(): void {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(username, password).subscribe((res: any) => {
      if(res) {
        localStorage.setItem('userId', res.id);
        this.showAttendanceModal = true;
      } else {
        alert('Authentication Failed')
      }
    });
  }

  public logout(): void {
    const checkIn = localStorage.getItem('checkIn');
    const checkOut = localStorage.getItem('checkOut');
    this.showAttendanceModal = false;

    if(checkIn && !checkOut) {
      const data = {
        checkIn: checkIn,
        checkOut: new Date().toString()
      }
      this.authService.logAttendance(this.userId, data).subscribe(res => {
        if(res) {
          localStorage.clear();
          alert('you have checked out successfully')
        }
      })
    }
    localStorage.clear();
  }
}
