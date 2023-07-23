import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  @Output() logoutEvent = new EventEmitter();

  private userId: number;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
  }

  public checkIn(): void {
    if (this.userId) {
      const now = new Date();
      if (now.getHours() < 13 || (now.getHours() === 13 && now.getMinutes() <= 30)) {
        localStorage.setItem('checkIn', now.toString());
        alert('You have checked in successfully');
      } else {
        alert('You can only check in before 1:30 PM.')
      }
    }
  }

  public checkOut(): void {
    if (this.userId) {
      const now = new Date();
      if (localStorage.getItem('checkIn')) {
        localStorage.setItem('checkOut', now.toString());
        const data = {
          checkIn: localStorage.getItem('checkIn'),
          checkOut: now.toString()
        }
        this.authService.logAttendance(this.userId, data).subscribe(res => {
          if(res) {
            localStorage.removeItem('checkIn');
            localStorage.removeItem('checkOut');
            alert('you have checked out successfully')
          }
        })
      } else {
        alert('You must check in first.')
      }
    }
  }

  public navigateTo(url: string): void {
    this.router.navigate([url])
  }

  public logout(): void {
    this.logoutEvent.emit();
  }

}
